import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

import { Unit } from '../enums';
@InputType('OrderItemInput')
export class OrderItemInput {
    @IsNotEmpty({ message: 'ID ингредиента обязателен' })
    @IsString({ message: 'ID ингредиента должно быть строкой' })
    @Field(() => ID, { description: 'ID ингредиента' })
    ingredientId!: string;

    @Min(1)
    @IsNotEmpty({ message: 'Количество ингредиента обязателен' })
    @IsNumber({}, { message: 'Количество ингредиента должно быть числом' })
    @Field(() => Float, {
        description: 'Количество ингредиента',
        defaultValue: 1,
    })
    quantity!: number;

    @IsEnum(Unit, { message: 'Единица измерения должна быть выбрана' })
    @IsNotEmpty({ message: 'Единица измерения обязательна' })
    @Field(() => Unit, { description: 'Единица измерения' })
    unit!: Unit;
}
