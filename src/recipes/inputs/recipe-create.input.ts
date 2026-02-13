import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    IsUrl,
    MinLength,
    ValidateNested,
} from 'class-validator';

import { Difficulty } from '../enums';

import { NutritionFactCreateInput } from './nutrition-fact-create.input';
import { RecipeIngredientCreateInput } from './recipe-ingredient-create.input';
import { RecipeStepCreateInput } from './recipe-step-create.input';
import { RecipeTagCreateInput } from './recipe-tag-create.input';

@InputType()
export class RecipeCreateInput {
    @IsString({ message: 'Название рецепта должно быть строкой' })
    @IsNotEmpty({ message: 'Название рецепта обязательно' })
    @MinLength(3, {
        message: 'Название рецепта должно быть не менее 3 символов',
    })
    @Field(() => String, { description: 'Название рецепта' })
    title!: string;
    @IsString({ message: 'Slug рецепта должен быть строкой' })
    @IsNotEmpty({ message: 'Slug рецепта обязателен' })
    @Field(() => String, { description: 'Slug рецепта' })
    slug!: string;
    @IsString({ message: 'Описание рецепта должно быть строкой' })
    @IsNotEmpty({ message: 'Описание рецепта обязательно' })
    @MinLength(5, {
        message: 'Описание рецепта должно быть не менее 3 символов',
    })
    @Field(() => String, { description: 'Описание рецепта' })
    description!: string;
    @IsNumber({}, { message: 'Количество калорий должно быть числом' })
    @IsNotEmpty({ message: 'Количество калорий обязательно' })
    @Field(() => Int, { description: 'Количество калорий' })
    calories!: number;
    @IsString({ message: 'Ссылка на картинку рецепта должна быть строкой' })
    @IsUrl({}, { message: 'Ссылка на картинку рецепта должна быть валидной' })
    @Field(() => String, { description: 'Ссылка на картинку рецепта' })
    imageUrl!: string;
    @IsEnum(Difficulty, { message: 'Сложность рецепта должна быть выбрана' })
    @IsNotEmpty({ message: 'Сложность рецепта обязательна' })
    @Field(() => Difficulty, { description: 'Сложность рецепта' })
    difficulty!: Difficulty;

    @IsNumber({}, { message: 'Время приготовления должно быть числом' })
    @IsNotEmpty({ message: 'Время приготовления обязательно' })
    @Field(() => Int, { description: 'Время приготовления' })
    cookingTime!: number;
    /* @IsString({ message: 'Автор рецепта должен быть строкой' })
    @IsNotEmpty({ message: 'Автор рецепта обязателен' })
    @Field(() => String, { description: 'Автор рецепта' })
    author!: string; */
    /* @IsString({ message: 'ID автора рецепта должно быть строкой' })
    @IsNotEmpty({ message: 'ID автора рецепта обязателен' })
    @Field(() => ID, { description: 'ID автора рецепта' })
    authorId!: string; */
    @ValidateNested()
    @Type(() => NutritionFactCreateInput)
    @Field(() => NutritionFactCreateInput, {
        description: 'Факты питания рецепта',
    })
    nutritionFact!: NutritionFactCreateInput;
    @ValidateNested({ each: true })
    @Type(() => RecipeIngredientCreateInput)
    @Field(() => [RecipeIngredientCreateInput], {
        description: 'Ингредиенты рецепта',
    })
    recipeIngredients!: RecipeIngredientCreateInput[];
    @ValidateNested({ each: true })
    @Type(() => RecipeStepCreateInput)
    @Field(() => [RecipeStepCreateInput], { description: 'Шаги рецепта' })
    recipeStep!: RecipeStepCreateInput[];
    @ValidateNested({ each: true })
    @Type(() => RecipeTagCreateInput)
    @Field(() => [RecipeTagCreateInput], { description: 'Теги рецепта' })
    tag!: RecipeTagCreateInput[];
}
