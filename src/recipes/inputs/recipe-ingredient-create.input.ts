import { Float } from '@nestjs/graphql';
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { Unit } from '../enums';

@InputType()
export class RecipeIngredientCreateInput {
    @IsNumber({}, { message: 'Количество ингредиента должно быть числом' })
    @IsNotEmpty({ message: 'Количество ингредиента обязательно' })
    @Field(() => Float, { description: 'Количество ингредиента' })
    quantity!: number;
    @IsEnum(Unit, { message: 'Единица измерения должна быть выбрана' })
    @IsNotEmpty({ message: 'Единица измерения обязательна' })
    @Field(() => Unit, { description: 'Единица измерения' })
    unit!: Unit;
    @IsString({ message: 'ID ингредиента должно быть строкой' })
    @IsNotEmpty({ message: 'ID ингредиента обязателен' })
    @Field(() => ID, { description: 'ID ингредиента' })
    ingredientId!: string;
}
