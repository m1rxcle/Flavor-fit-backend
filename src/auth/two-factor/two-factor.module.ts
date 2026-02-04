import { Module } from '@nestjs/common';

import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';

import { TwoFactorResolver } from './two-factor.resolver';
import { TwoFactorService } from './two-factor.service';

@Module({
    imports: [MailModule],
    providers: [TwoFactorResolver, TwoFactorService, MailService, UsersService],
    exports: [TwoFactorService],
})
export class TwoFactorModule {}
