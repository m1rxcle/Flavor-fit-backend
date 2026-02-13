import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { UserProfileModel } from 'src/users/models';

import { CommentsModel } from '../comments/model';
import { Difficulty } from '../enums';
import { LikeModel } from '../likes/models';

import { NutritionFactModel } from './nutrition-fact.model';
import { RecipeIngredientModel } from './recipe-ingredient.model';
import { RecipeStepModel } from './recipe-step.model';
import { RecipeTagModel } from './tag.model';
import { ViewModel } from './view.model';

@ObjectType()
export class RecipeModel {
    @Field(() => ID, { description: 'ID рецепта' })
    id!: string;
    @Field(() => String, { description: 'Название рецепта' })
    title!: string;
    @Field(() => String, { description: 'Slug рецепта' })
    slug!: string;
    @Field(() => UserProfileModel, { description: 'Автор рецепта' })
    author!: UserProfileModel;
    @Field(() => String, { description: 'ID автора рецепта' })
    authorId!: string;
    @Field(() => Int, { description: 'Количество калорий' })
    calories!: number;
    @Field(() => Int, { description: 'Время приготовления' })
    cookingTime!: number;
    @Field(() => String, { description: 'Описание рецепта' })
    description!: string;
    @Field(() => Difficulty, { description: 'Сложность рецепта' })
    difficulty!: Difficulty;
    @Field(() => String, { description: 'Ссылка на картинку рецепта' })
    imageUrl!: string;
    @Field(() => [RecipeStepModel], { description: 'Шаги рецепта' })
    recipeStep!: RecipeStepModel[];
    @Field(() => [RecipeIngredientModel], {
        description: 'Ингредиенты рецепта',
    })
    recipeIngredients!: RecipeIngredientModel[];
    @Field(() => NutritionFactModel, { description: 'Факты питания рецепта' })
    nutritionFact!: NutritionFactModel;
    @Field(() => [RecipeTagModel], { description: 'Теги рецепта' })
    tag!: RecipeTagModel[];

    @Field(() => [LikeModel], { description: 'Лайки рецепта', nullable: true })
    likes?: LikeModel[];
    @Field(() => [CommentsModel], {
        description: 'Комментарии рецепта',
        nullable: true,
    })
    comments?: CommentsModel[];
    @Field(() => [ViewModel], {
        description: 'Просмотры рецепта',
        nullable: true,
    })
    views?: ViewModel[];
    @Field(() => Date, { description: 'Дата создания рецепта' })
    createdAt!: Date;
    @Field(() => Date, { description: 'Дата обновления рецепта' })
    updatedAt!: Date;
}
