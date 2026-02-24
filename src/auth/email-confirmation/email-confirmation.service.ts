import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import type { User } from 'prisma/generated/prisma/client';
import { TokenType } from 'prisma/generated/prisma/enums';

import { generateTokens } from 'src/common/utils';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

import type { ConfirmationInput } from './inputs';

@Injectable()
export class EmailConfirmationService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UsersService,
        private readonly mailService: MailService,
    ) {}

    public async newVerification(input: ConfirmationInput) {
        const { token } = input;

        const existingToken = await this.prismaService.token.findUnique({
            where: {
                token: token,
                type: TokenType.VERIFICATION,
            },
        });

        if (!existingToken) {
            throw new NotFoundException(
                'Код подтверждения не найден. Пожалуйста, убедитесь, что у вас правильный код.',
            );
        }

        const hasExpired = new Date(existingToken.expiresIn) < new Date();

        if (hasExpired) {
            throw new BadRequestException(
                'Код подтверждения устарел. Пожалуйста, запросите новый код для подтверждения.',
            );
        }

        const existingUser = await this.userService.findByEmail(
            existingToken.email,
        );

        if (!existingUser) {
            throw new NotFoundException(
                'Пользователь с указанным адресом электронной почты не найден. Пожалуйста, убедитесь, что вы ввели правильный email.',
            );
        }

        await this.prismaService.user.update({
            where: {
                id: existingUser.id,
            },
            data: {
                isVerified: true,
            },
        });

        await this.prismaService.token.deleteMany({
            where: {
                userId: existingUser.id,
                type: TokenType.VERIFICATION,
            },
        });

        return true;
    }

    public async sendVerificationToken(user: User) {
        const verificationToken = await generateTokens(
            user,
            TokenType.VERIFICATION,
            this.prismaService,
        );

        await this.mailService.sendConfirmationEmail(
            verificationToken.email,
            verificationToken.token,
        );

        return true;
    }

    public async resendVerificationToken(email: string) {
        const user = await this.userService.findByEmail(email);

        if (!user) throw new NotFoundException('Пользователь не найден !');

        if (user.isVerified)
            throw new BadRequestException('Пользователь уже верифицирован !');

        return this.sendVerificationToken(user);
    }
}
