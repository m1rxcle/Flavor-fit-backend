import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    MinLength,
    ValidateNested,
} from 'class-validator';

import { Difficulty } from '../enums';

import { NutritionFactUpdateInput } from './nutrition-fact-update.input';
import { RecipeIngredientUpdateInput } from './recipe-ingredient-update.input';
import { RecipeStepUpdateInput } from './recipe-step-update.input';
import { RecipeTagUpdateInput } from './recipe-tag-update.input';

@InputType('RecipeUpdateInput')
export class RecipeUpdateInput {
    @IsString({ message: 'Название рецепта должно быть строкой' })
    @IsOptional({ message: 'Название рецепта не обязательно' })
    @MinLength(3, {
        message: 'Название рецепта должно быть не менее 3 символов',
    })
    @Field(() => String, { description: 'Название рецепта', nullable: true })
    title?: string;
    @IsString({ message: 'Slug рецепта должен быть строкой' })
    @IsOptional({ message: 'Slug рецепта не обязателен' })
    @Field(() => String, { description: 'Slug рецепта', nullable: true })
    slug?: string;
    @IsString({ message: 'Описание рецепта должно быть строкой' })
    @IsOptional({ message: 'Описание рецепта не обязательно' })
    @MinLength(5, {
        message: 'Описание рецепта должно быть не менее 3 символов',
    })
    @Field(() => String, { description: 'Описание рецепта', nullable: true })
    description?: string;
    @IsNumber({}, { message: 'Количество калорий должно быть числом' })
    @IsOptional({ message: 'Количество калорий не обязательно' })
    @Field(() => Int, { description: 'Количество калорий', nullable: true })
    calories?: number;
    @IsOptional({ message: 'Ссылка на картинку рецепта не обязательна' })
    @IsString({ message: 'Ссылка на картинку рецепта должна быть строкой' })
    @IsUrl({}, { message: 'Ссылка на картинку рецепта должна быть валидной' })
    @Field(() => String, {
        description: 'Ссылка на картинку рецепта',
        nullable: true,
    })
    imageUrl?: string;
    @IsEnum(Difficulty, { message: 'Сложность рецепта должна быть выбрана' })
    @IsOptional({ message: 'Сложность рецепта не обязательна' })
    @Field(() => Difficulty, {
        description: 'Сложность рецепта',
        nullable: true,
    })
    difficulty?: Difficulty;

    @IsNumber({}, { message: 'Время приготовления должно быть числом' })
    @IsOptional({ message: 'Время приготовления не обязательно' })
    @Field(() => Int, { description: 'Время приготовления', nullable: true })
    cookingTime?: number;
    /* @IsString({ message: 'Автор рецепта должен быть строкой' })
    @IsOptional({ message: 'Автор рецепта не обязателен' })
    @Field(() => String, { description: 'Автор рецепта', nullable: true })
    author?: string; */

    @ValidateNested()
    @Type(() => NutritionFactUpdateInput)
    @Field(() => NutritionFactUpdateInput, {
        description: 'Факты питания рецепта',
        nullable: true,
    })
    nutritionFact?: NutritionFactUpdateInput;
    @ValidateNested({ each: true })
    @Type(() => RecipeIngredientUpdateInput)
    @Field(() => [RecipeIngredientUpdateInput], {
        description: 'Ингредиенты рецепта',
        nullable: true,
    })
    recipeIngredients?: RecipeIngredientUpdateInput[];
    @ValidateNested({ each: true })
    @Type(() => RecipeStepUpdateInput)
    @Field(() => [RecipeStepUpdateInput], {
        description: 'Шаги рецепта',
        nullable: true,
    })
    recipeStep?: RecipeStepUpdateInput[];
    @ValidateNested({ each: true })
    @Type(() => RecipeTagUpdateInput)
    @Field(() => [RecipeTagUpdateInput], {
        description: 'Теги рецепта',
        nullable: true,
    })
    tag?: RecipeTagUpdateInput[];
}
