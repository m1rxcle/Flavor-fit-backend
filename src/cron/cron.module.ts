import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';

import { CronService } from './cron.service';

@Module({
    imports: [ScheduleModule.forRoot(), MailModule],
    providers: [CronService, MailService],
    exports: [CronService],
})
export class CronModule {}
