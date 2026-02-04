import { Module } from '@nestjs/common';

import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';

import { EmailConfirmationResolver } from './email-confirmation.resolver';
import { EmailConfirmationService } from './email-confirmation.service';

@Module({
    imports: [MailModule],
    providers: [
        EmailConfirmationResolver,
        EmailConfirmationService,
        UsersService,
        MailService,
    ],

    exports: [EmailConfirmationService],
})
export class EmailConfirmationModule {}
