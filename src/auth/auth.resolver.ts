import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserWithOutPassword } from './models/user-without-password.model';
import { RegisterDTO } from './models/register-dto.model';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => UserWithOutPassword)
    async register(
        @Args({ name: 'dto', type: () => RegisterDTO }) dto: RegisterDTO,
    ) {
        return this.authService.register(dto);
    }
}
