import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Role } from 'prisma/generated/prisma/enums';

import { Authorization } from 'src/auth/decorators';

import { IngredientsService } from './ingredients.service';
import { IngredientInput, IngredientUpdateInput } from './inputs';
import { IngredientModel } from './models';

@Resolver()
export class IngredientsResolver {
    constructor(private readonly ingredientsService: IngredientsService) {}

    @Authorization(Role.ADMIN)
    @Query(() => [IngredientModel])
    public getAllIngredients() {
        return this.ingredientsService.findAll();
    }

    @Authorization(Role.ADMIN)
    @Query(() => IngredientModel)
    public getIngredientById(@Args('id') id: string) {
        return this.ingredientsService.findById(id);
    }
    @Authorization(Role.ADMIN)
    @Mutation(() => IngredientModel)
    public createIngredient(
        @Args('data', { type: () => IngredientInput })
        input: IngredientInput,
    ) {
        return this.ingredientsService.create(input);
    }
    @Authorization(Role.ADMIN)
    @Mutation(() => IngredientModel)
    public updateIngredient(
        @Args('id') id: string,
        @Args('data', { type: () => IngredientUpdateInput })
        input: IngredientUpdateInput,
    ) {
        return this.ingredientsService.update(id, input);
    }
    @Authorization(Role.ADMIN)
    @Mutation(() => Boolean)
    public deleteIngredient(@Args('id') id: string) {
        return this.ingredientsService.delete(id);
    }
}
