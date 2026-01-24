import { Module } from '@nestjs/common';
import { registerEnumType } from '@nestjs/graphql';
import { Role } from 'prisma/generated/prisma/enums';

@Module({})
export class GraphQLEnumModule {
    constructor() {
        registerEnumType(Role, {
            name: 'Role',
            description: 'The role of the user',
            valuesMap: {
                ADMIN: { description: 'Administrator with full access' },
                USER: { description: 'Regular user with limited access' },
            },
        });
    }
}
