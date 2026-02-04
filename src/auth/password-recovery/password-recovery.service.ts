import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { hash } from 'argon2';

import { TokenType } from 'prisma/generated/prisma/enums';

import type { UserMetadata } from 'src/common/interfaces';
import { generateTokens, getMetadata } from 'src/common/utils';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

import type { NewPasswordInput } from './inputs/new-password.input';
import type { RecoveryInput } from './inputs/recovery.input';
import type { Request } from 'express';

@Injectable()
export class PasswordRecoveryService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly mailService: MailService,
        private readonly userService: UsersService,
    ) {}

    async resetPassword(req: Request, input: RecoveryInput, userAgent: string) {
        const { email } = input;

        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new Error('Пользователь не найден');
        }

        const recoveryToken = await generateTokens(
            user,
            TokenType.PASSWORD_RESET,
            this.prismaService,
        );

        const userMetadata: UserMetadata = getMetadata(req, userAgent);

        await this.mailService.sendRecoveryTokenToEmail(
            recoveryToken.email,
            recoveryToken.token,
            userMetadata,
        );

        return true;
    }

    async newPassword(input: NewPasswordInput) {
        const { token, newPassword } = input;

        const existingToken = await this.prismaService.token.findUnique({
            where: {
                token: token,
                type: TokenType.PASSWORD_RESET,
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

        await this.prismaService.user.update({
            where: {
                email: existingToken.email,
            },
            data: {
                password: await hash(newPassword),
            },
        });

        await this.prismaService.token.delete({
            where: {
                token: token,
                type: TokenType.PASSWORD_RESET,
            },
        });

        return true;
    }
}
