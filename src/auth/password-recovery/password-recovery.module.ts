import { Module } from '@nestjs/common';

import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';

import { PasswordRecoveryResolver } from './password-recovery.resolver';
import { PasswordRecoveryService } from './password-recovery.service';

@Module({
    imports: [MailModule],
    providers: [
        PasswordRecoveryResolver,
        PasswordRecoveryService,
        UsersService,
        MailService,
    ],
    exports: [PasswordRecoveryService],
})
export class PasswordRecoveryModule {}
