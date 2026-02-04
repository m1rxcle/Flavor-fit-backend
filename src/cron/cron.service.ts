import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CronService {
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly mailService: MailService,
    ) {}

    @Cron('0 0 0 */4 * *')
    public async sendEmailsToUsersWithoutTwoFactor() {
        const users = await this.prismaService.user.findMany({
            where: {
                isTwoFactorEnabled: false,
                role: 'USER',
            },
        });

        if (users.length > 0) {
            for (const user of users) {
                await this.mailService.sendEmailToUsersWithoutTwoFactor(
                    user.email,
                );
            }
        }
    }
}
