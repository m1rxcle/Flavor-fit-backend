import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { getJwtConfig } from 'src/config';
/* import { TelegramModule } from 'src/telegram/telegram.module'; */
/* import { TelegramService } from 'src/telegram/telegram.service'; */
import { UsersService } from 'src/users/users.service';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { PasswordRecoveryModule } from './password-recovery/password-recovery.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TwoFactorModule } from './two-factor/two-factor.module';
import { TwoFactorService } from './two-factor/two-factor.service';

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: getJwtConfig,
            inject: [ConfigService],
        }),
        EmailConfirmationModule,
        PasswordRecoveryModule,
        TwoFactorModule,
        /*  TelegramModule, */
    ],
    providers: [
        UsersService,
        AuthResolver,
        AuthService,
        JwtStrategy,
        TwoFactorService,
        /* TelegramService, */
    ],
})
export class AuthModule {}
