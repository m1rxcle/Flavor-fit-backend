import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NutritionFactModel {
    @Field(() => String, { description: 'ID' })
    id!: string;
    @Field(() => Float, { description: 'Количество углеводов' })
    carbohydrates!: number;
    @Field(() => Float, { description: 'Количество жиров' })
    fats!: number;
    @Field(() => Float, { description: 'Количество белков' })
    proteins!: number;
    @Field(() => Float, { description: 'Количество клетчатки' })
    fiber!: number;
    @Field(() => String, { description: 'ID рецепта' })
    recipeId!: string;
    @Field(() => Date, { description: 'Дата создания' })
    createdAt!: Date;
    @Field(() => Date, { description: 'Дата обновления' })
    updatedAt!: Date;
}
