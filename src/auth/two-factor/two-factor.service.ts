import { Injectable } from '@nestjs/common';

import { TokenType, type User } from 'prisma/generated/prisma/client';

import type { UserMetadata } from 'src/common/interfaces';
import { generateTokens } from 'src/common/utils';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TwoFactorService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UsersService,
        private readonly mailService: MailService,
    ) {}

    public async enable(id: string) {
        await this.prismaService.user.update({
            where: {
                id,
            },
            data: {
                isTwoFactorEnabled: true,
            },
        });

        return true;
    }

    public async disable(id: string) {
        await this.prismaService.user.update({
            where: {
                id,
            },
            data: {
                isTwoFactorEnabled: false,
            },
        });

        return true;
    }

    public async sendTwoFactorToken(user: User, userMetadata: UserMetadata) {
        const twoFactorToken = await generateTokens(
            user,
            TokenType.TWO_FACTOR,
            this.prismaService,
        );

        await this.mailService.sendOnEmailTwoFactorToken(
            twoFactorToken.email,
            twoFactorToken.token,
            userMetadata,
        );

        return true;
    }
}
