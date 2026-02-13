import { Float } from '@nestjs/graphql';
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { Unit } from '../enums';

@InputType()
export class RecipeIngredientUpdateInput {
    @IsNumber({}, { message: 'Количество ингредиента должно быть числом' })
    @IsOptional({ message: 'Количество ингредиента не обязательно' })
    @Field(() => Float, { description: 'Количество ингредиента' })
    quantity?: number;
    @IsEnum(Unit, { message: 'Единица измерения должна быть выбрана' })
    @IsOptional({ message: 'Единица измерения не обязательна' })
    @Field(() => Unit, { description: 'Единица измерения' })
    unit?: Unit;
    @IsString({ message: 'ID ингредиента должно быть строкой' })
    @IsOptional({ message: 'ID ингредиента не обязателен' })
    @Field(() => ID, { description: 'ID ингредиента' })
    ingredientId?: string;
}
