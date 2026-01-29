import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { LoginInput, RegisterInput } from './inputs';
import { AuthResponse } from './models';

import type { GraphQLContext } from 'src/common/interfaces';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => AuthResponse)
    async register(
        @Context() { res }: GraphQLContext,
        @Args({ name: 'data', type: () => RegisterInput }) input: RegisterInput,
    ) {
        return this.authService.register(res, input);
    }

    @Mutation(() => AuthResponse)
    async login(
        @Context() { res }: GraphQLContext,
        @Args({ name: 'data', type: () => LoginInput }) input: LoginInput,
    ) {
        return this.authService.login(res, input);
    }

    @Mutation(() => Boolean)
    async logout(@Context() { res }: GraphQLContext) {
        return this.authService.logout(res);
    }

    @Mutation(() => AuthResponse)
    async refresh(@Context() { req, res }: GraphQLContext) {
        return this.authService.refresh(req, res);
    }
}
