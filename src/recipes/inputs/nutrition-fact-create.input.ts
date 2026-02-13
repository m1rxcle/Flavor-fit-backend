import { Field, Float, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class NutritionFactCreateInput {
    @IsNumber({}, { message: 'Количество углеводов должно быть числом' })
    @IsNotEmpty({ message: 'Количество углеводов  обязательно' })
    @Field(() => Float, { description: 'Количество углеводов' })
    carbohydrates!: number;
    @IsNumber({}, { message: 'Количество жиров должно быть числом' })
    @IsNotEmpty({ message: 'Количество жиров  обязательно' })
    @Field(() => Float, { description: 'Количество жиров' })
    fats!: number;
    @IsNumber({}, { message: 'Количество белков должно быть числом' })
    @IsNotEmpty({ message: 'Количество белков  обязательно' })
    @Field(() => Float, { description: 'Количество белков' })
    proteins!: number;
    @Field(() => Float, { description: 'Количество клетчатки' })
    @IsNumber({}, { message: 'Количество клетчатки должно быть числом' })
    @IsNotEmpty({ message: 'Количество клетчатки  обязательно' })
    fiber!: number;
}
