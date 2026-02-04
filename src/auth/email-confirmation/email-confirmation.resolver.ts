import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { EmailConfirmationService } from './email-confirmation.service';
import { ConfirmationInput } from './inputs/confirmation.input';

@Resolver()
export class EmailConfirmationResolver {
    constructor(
        private readonly emailConfirmationService: EmailConfirmationService,
    ) {}

    @Mutation(() => Boolean, { name: 'verifyEmail' })
    public verify(@Args('data') input: ConfirmationInput) {
        return this.emailConfirmationService.newVerification(input);
    }
}
