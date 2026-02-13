import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import type { User } from 'prisma/generated/prisma/client';
import { Role } from 'prisma/generated/prisma/enums';

import { Authorization, Authorized } from 'src/auth/decorators';
import type { ISortBy } from 'src/common/interfaces';

import { RecipeCreateInput, RecipeUpdateInput } from './inputs';
import { RecipeModel } from './models';
import { RecipesService } from './recipes.service';
@Authorization()
@Resolver()
export class RecipesResolver {
    constructor(private readonly recipesService: RecipesService) {}

    @Query(() => [RecipeModel])
    public getAllRecipes(
        @Args('take', { type: () => Number, defaultValue: 10 }) take: number,
    ) {
        return this.recipesService.getAll(take);
    }

    @Query(() => [RecipeModel])
    public getRecipeFilters() {
        return this.recipesService.getFilters();
    }

    @Query(() => [RecipeModel])
    public sortRecipes(
        @Args('sortBy', { type: () => String }) sortBy: ISortBy,
    ) {
        return this.recipesService.sort(sortBy);
    }

    @Query(() => [RecipeModel])
    public searchRecipes(@Args('searchTerm') searchTerm: string) {
        return this.recipesService.search(searchTerm);
    }

    @Query(() => RecipeModel)
    public getRecipeBySlug(
        @Args('slug') slug: string,
        @Authorized('id') userId: string,
    ) {
        return this.recipesService.getBySlug(userId, slug);
    }

    @Mutation(() => RecipeModel)
    public createRecipe(
        @Authorized('id') authorId: string,
        @Args('data', { type: () => RecipeCreateInput })
        input: RecipeCreateInput,
    ) {
        return this.recipesService.create(authorId, input);
    }

    @Mutation(() => RecipeModel)
    public updateRecipe(
        @Authorized('id') authorId: string,
        @Args('id') id: string,
        @Args('data', { type: () => RecipeCreateInput })
        input: RecipeCreateInput,
    ) {
        return this.recipesService.update(id, authorId, input);
    }

    @Mutation(() => Boolean)
    public deleteRecipe(@Authorized() author: User, @Args('id') id: string) {
        return this.recipesService.delete(id, author);
    }

    @Authorization(Role.ADMIN)
    @Query(() => RecipeModel)
    public getRecipeById(@Args('id') id: string) {
        return this.recipesService.getById(id);
    }
}
