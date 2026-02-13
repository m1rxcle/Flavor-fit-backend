import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class RecipeTagUpdateInput {
    @IsString({ message: 'Название тега должно быть строкой' })
    @IsOptional({ message: 'Название тега не обязательно' })
    @Field(() => String, { description: 'Название тега', nullable: true })
    name?: string;
}
