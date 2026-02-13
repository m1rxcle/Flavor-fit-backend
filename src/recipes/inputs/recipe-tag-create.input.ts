import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class RecipeTagCreateInput {
    @IsString({ message: 'Название тега должно быть строкой' })
    @IsNotEmpty({ message: 'Название тега  обязательно' })
    @Field(() => String)
    name!: string;
}
