import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

import { getMailerConfig } from 'src/config';

import { MailService } from './mail.service';

@Global()
@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMailerConfig,
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
