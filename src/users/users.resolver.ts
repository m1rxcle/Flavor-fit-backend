import { Query, Resolver } from '@nestjs/graphql';
import { Role } from 'prisma/generated/prisma/enums';

import { Authorization, Authorized } from 'src/auth/decorators';

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
}
