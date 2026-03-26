import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TurnstileModule } from 'nest-cloudflare-turnstile';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { getGraphQLConfig, getTurnstileConfig } from './config';
import { CronModule } from './cron/cron.module';
import { MailModule } from './mail/mail.module';
import { MediaUploadModule } from './media-upload/media-upload.module';
import { OrdersModule } from './orders/orders.module';
import { PrismaModule } from './prisma/prisma.module';
import { RecipesModule } from './recipes/recipes.module';
/* import { TelegramModule } from './telegram/telegram.module'; */
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        PrismaModule,
        AuthModule,
        UsersModule,
        RecipesModule,
        OrdersModule,
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            imports: [ConfigModule],
            useFactory: getGraphQLConfig,
            inject: [ConfigService],
        }),
        TurnstileModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: getTurnstileConfig,
            inject: [ConfigService],
        }),
        MailModule,
        CronModule,
        /*  TelegramModule, */
        MediaUploadModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
