import { Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserData } from './models/user.model';

@Resolver(() => UserData)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(() => [UserData])
    async findAll() {
        return this.usersService.findAll();
    }
}
