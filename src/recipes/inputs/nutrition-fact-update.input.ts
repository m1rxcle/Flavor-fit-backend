import { Field, Float, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

@InputType()
export class NutritionFactUpdateInput {
    @IsNumber({}, { message: 'Количество углеводов должно быть числом' })
    @IsOptional({ message: 'Количество углеводов не обязательно' })
    @Field(() => Float, { description: 'Количество углеводов', nullable: true })
    carbohydrates?: number;
    @IsNumber({}, { message: 'Количество жиров должно быть числом' })
    @IsOptional({ message: 'Количество жиров не обязательно' })
    @Field(() => Float, { description: 'Количество жиров', nullable: true })
    fats?: number;
    @IsNumber({}, { message: 'Количество белков должно быть числом' })
    @IsOptional({ message: 'Количество белков не обязательно' })
    @Field(() => Float, { description: 'Количество белков', nullable: true })
    proteins?: number;
    @Field(() => Float, { description: 'Количество клетчатки', nullable: true })
    @IsNumber({}, { message: 'Количество клетчатки должно быть числом' })
    @IsOptional({
        message: 'Количество клетчатки не обязательно',
    })
    fiber?: number;
}
