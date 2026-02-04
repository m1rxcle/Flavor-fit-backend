import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import type { GraphQLContext } from 'src/common/interfaces';

import { UserAgent } from '../decorators';

import { NewPasswordInput } from './inputs/new-password.input';
import { RecoveryInput } from './inputs/recovery.input';
import { PasswordRecoveryService } from './password-recovery.service';

@Resolver()
export class PasswordRecoveryResolver {
    constructor(
        private readonly passwordRecoveryService: PasswordRecoveryService,
    ) {}

    @Mutation(() => Boolean, {
        name: 'resetPassword',
    })
    resetPassword(
        @Context() { req }: GraphQLContext,
        @UserAgent() userAgent: string,
        @Args('data', { type: () => RecoveryInput }) input: RecoveryInput,
    ) {
        return this.passwordRecoveryService.resetPassword(
            req,
            input,
            userAgent,
        );
    }

    @Mutation(() => Boolean, {
        name: 'newPassword',
    })
    newPassword(
        @Args('data', { type: () => NewPasswordInput }) input: NewPasswordInput,
    ) {
        return this.passwordRecoveryService.newPassword(input);
    }
}
