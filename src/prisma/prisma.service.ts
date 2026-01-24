import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'prisma/generated/prisma/client';
@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    constructor(private readonly configService: ConfigService) {
        const connectionString =
            configService.getOrThrow<string>('POSTGRES_URI');

        const pool = new PrismaPg({ connectionString });
        super({ adapter: pool });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
