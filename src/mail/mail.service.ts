import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { render } from '@react-email/components';

import type { UserMetadata } from 'src/common/interfaces';

import {
    ConfirmationTemplate,
    RecoveryTemplate,
    TwoFactorConfirmationTemplate,
    TwoFactorReminderTemplate,
} from './templates';

@Injectable()
export class MailService {
    public constructor(private readonly mailerService: MailerService) {}

    public async sendConfirmationEmail(email: string, token: string) {
        const html = await render(ConfirmationTemplate({ token }));

        return this.sendMail(email, 'Подтверждение почты', html);
    }

    public async sendRecoveryTokenToEmail(
        email: string,
        token: string,
        userMetadata: UserMetadata,
    ) {
        const html = await render(RecoveryTemplate({ token, userMetadata }));

        return this.sendMail(email, 'Сброс пароля', html);
    }

    public async sendEmailToUsersWithoutTwoFactor(email: string) {
        const html = await render(TwoFactorReminderTemplate());
        return this.sendMail(email, 'Системное сообщение', html);
    }

    public async sendOnEmailTwoFactorToken(
        email: string,
        token: string,
        userMetadata: UserMetadata,
    ) {
        const html = await render(
            TwoFactorConfirmationTemplate({ token, userMetadata }),
        );

        return this.sendMail(email, 'Подтверждение входа', html);
    }

    private sendMail(
        email: string,
        subject: string,
        html: string,
    ): Promise<void> {
        return this.mailerService.sendMail({
            to: email,
            subject,
            html,
        });
    }
}
