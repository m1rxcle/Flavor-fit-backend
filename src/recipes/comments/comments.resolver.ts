import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import type { User } from 'prisma/generated/prisma/client';

import { Authorization, Authorized } from 'src/auth/decorators';

import { CommentsService } from './comments.service';
import { CommentInput } from './inputs/comment.input';
import { CommentsModel } from './model';

@Resolver()
export class CommentsResolver {
    constructor(private readonly commentsService: CommentsService) {}

    @Query(() => [CommentsModel])
    public getAllCommentsFromRecipe(
        @Args('recipeId', { type: () => String }) recipeId: string,
    ) {
        return this.commentsService.getAllFromRecipe(recipeId);
    }

    @Authorization()
    @Mutation(() => CommentsModel)
    public createComment(
        @Authorized('id') authorId: string,
        @Args('input', { type: () => CommentInput }) input: CommentInput,
    ) {
        return this.commentsService.create(authorId, input);
    }

    @Authorization()
    @Mutation(() => Boolean)
    public editComment(
        @Authorized('id') authorId: string,
        @Args('id', { type: () => String }) id: string,
        @Args('input', { type: () => CommentInput }) input: CommentInput,
    ) {
        return this.commentsService.edit(id, authorId, input);
    }

    @Authorization()
    @Mutation(() => Boolean)
    public deleteComment(
        @Authorized() user: User,
        @Args('id', { type: () => String }) id: string,
    ) {
        return this.commentsService.delete(id, user);
    }
}
