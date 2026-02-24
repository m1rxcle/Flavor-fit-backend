import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { EmailConfirmationService } from './email-confirmation.service';
import { ConfirmationInput } from './inputs/confirmation.input';

@Resolver()
export class EmailConfirmationResolver {
    constructor(
        private readonly emailConfirmationService: EmailConfirmationService,
    ) {}

    @Mutation(() => Boolean, { name: 'verifyEmail' })
    public verify(
        @Args('data', { type: () => ConfirmationInput })
        input: ConfirmationInput,
    ) {
        return this.emailConfirmationService.newVerification(input);
    }

    @Mutation(() => Boolean, { name: 'resendVerificationEmail' })
    public resendVerificationEmail(
        @Args('email', { type: () => String }) email: string,
    ) {
        return this.emailConfirmationService.resendVerificationToken(email);
    }
}
