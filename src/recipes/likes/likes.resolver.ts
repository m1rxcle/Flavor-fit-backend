import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Authorization, Authorized } from 'src/auth/decorators';

import { LikesService } from './likes.service';
import { LikeResponse } from './models';

@Resolver()
export class LikesResolver {
    constructor(private readonly likesService: LikesService) {}

    @Authorization()
    @Mutation(() => LikeResponse)
    public toggleLike(
        @Authorized('id') userId: string,
        @Args('recipeId') recipeId: string,
    ) {
        return this.likesService.toggle(recipeId, userId);
    }

    @Query(() => Int)
    public getAllLikesFromRecipe(@Args('recipeId') recipeId: string) {
        return this.likesService.getAllFromRecipe(recipeId);
    }
}
