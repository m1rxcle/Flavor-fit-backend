import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';
import { OrdersModule } from './orders/orders.module';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { getGraphQLConfig } from './config/graphql.config';
import { Role } from 'prisma/generated/prisma/enums';
import { GraphQLEnumModule } from './modules/graphql-enum.module';

registerEnumType(Role, { name: 'Role' });

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
        GraphQLEnumModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
