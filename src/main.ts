import {
    ConsoleLogger,
    INestApplication,
    ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { validationPipeConfig } from './config';

import 'dotenv';

async function bootstrap() {
    const app = await NestFactory.create<INestApplication>(AppModule, {
        logger: new ConsoleLogger({
            prefix: 'MIRA.backend',
        }),
    });

    const config = app.get(ConfigService);

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe(validationPipeConfig));

    app.enableCors({
        origin: config.getOrThrow<string>('CORS_ORIGIN'),
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    });

    await app.listen(config.getOrThrow<number>('PORT'));
}
bootstrap();
