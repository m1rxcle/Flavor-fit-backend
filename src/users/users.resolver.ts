import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import type { User } from 'prisma/generated/prisma/client';
import { Role } from 'prisma/generated/prisma/enums';

import { Authorization, Authorized } from 'src/auth/decorators';

import {
    ChangeEmailInput,
    ChangePasswordInput,
    UserUpdateInput,
} from './inputs';
import { UserProfileModel } from './models';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Authorization(Role.ADMIN)
    @Query(() => [UserProfileModel], {
        name: 'getAllUsers',
        description: 'Получить всех пользователей',
    })
    async findAll() {
        return this.usersService.findAll();
    }

    @Authorization()
    @Query(() => UserProfileModel, {
        name: 'profile',
        description: 'Получить пользователя по id',
    })
    async getProfile(@Authorized('id') id: string) {
        return this.usersService.findById(id);
    }

    @Authorization()
    @Mutation(() => Boolean, {
        name: 'changeEmail',
    })
    async changeEmail(
        @Authorized() user: User,
        @Args('data', { type: () => ChangeEmailInput })
        input: ChangeEmailInput,
    ) {
        return this.usersService.changeEmail(user, input);
    }

    @Authorization()
    @Mutation(() => Boolean, {
        name: 'changePassword',
    })
    async changePassword(
        @Authorized() user: User,
        @Args('data', { type: () => ChangePasswordInput })
        input: ChangePasswordInput,
    ) {
        return this.usersService.changePassword(user, input);
    }

    @Mutation(() => UserProfileModel)
    @Authorization()
    async updateProfile(
        @Authorized('id') id: string,
        @Args('data', { type: () => UserUpdateInput }) input: UserUpdateInput,
    ) {
        return this.usersService.updateProfile(id, input);
    }
}
