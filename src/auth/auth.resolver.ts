import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import type { GraphQLContext } from 'src/common/interfaces';

import { AuthService } from './auth.service';
import { UserAgent } from './decorators/user-agent.decorator';
import { LoginInput, RegisterInput } from './inputs';
import { AuthResponse, RegisterResponse } from './models';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => RegisterResponse)
    register(
        @Args({ name: 'data', type: () => RegisterInput }) input: RegisterInput,
    ) {
        return this.authService.register(input);
    }

    @Mutation(() => AuthResponse)
    login(
        @Context() { req, res }: GraphQLContext,
        @Args({ name: 'data', type: () => LoginInput }) input: LoginInput,
        @UserAgent() userAgent: string,
    ) {
        return this.authService.login(req, res, input, userAgent);
    }

    @Mutation(() => Boolean)
    logout(@Context() { res }: GraphQLContext) {
        return this.authService.logout(res);
    }

    @Mutation(() => AuthResponse)
    refresh(@Context() { req, res }: GraphQLContext) {
        return this.authService.refresh(req, res);
    }
}
