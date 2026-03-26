import { Field, Float, ObjectType } from '@nestjs/graphql';

import { Unit } from '../enums';
import { IngredientModel } from '../ingredients/models';

@ObjectType()
export class RecipeIngredientModel {
    @Field(() => String, { description: 'ID ингредиента' })
    id!: string;
    @Field(() => IngredientModel, { description: 'Ингредиент' })
    ingredient!: IngredientModel;
    @Field(() => Float, { description: 'Количество ингредиента' })
    quantity!: number;
    @Field(() => String, { description: 'ID рецепта' })
    recipeId!: string;
    @Field(() => Unit, { description: 'Единица измерения' })
    unit!: Unit;
    @Field(() => Date, { description: 'Цена ингредиента' })
    createdAt!: Date;
    @Field(() => Date, { description: 'Дата обновления ингредиента' })
    updatedAt!: Date;
}
