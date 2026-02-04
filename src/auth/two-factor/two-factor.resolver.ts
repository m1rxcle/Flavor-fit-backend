import { Mutation, Resolver } from '@nestjs/graphql';

import { Authorization, Authorized } from '../decorators';

import { TwoFactorService } from './two-factor.service';

@Resolver()
export class TwoFactorResolver {
    constructor(private readonly twoFactorService: TwoFactorService) {}

    @Authorization()
    @Mutation(() => Boolean)
    enableTwoFactor(@Authorized('id') id: string) {
        return this.twoFactorService.enable(id);
    }

    @Authorization()
    @Mutation(() => Boolean)
    disableTwoFactor(@Authorized('id') id: string) {
        return this.twoFactorService.disable(id);
    }
}
