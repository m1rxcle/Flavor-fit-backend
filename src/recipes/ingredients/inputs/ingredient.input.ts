import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType({ description: 'Ингредиент' })
export class IngredientInput {
    @IsString({ message: 'Название ингредиента должно быть строкой' })
    @IsNotEmpty({ message: 'Название ингредиента обязательно' })
    @Field(() => String, {
        description: 'Название ингредиента',
    })
    title!: string;
    @IsString({ message: 'Единица измерения должна быть строкой' })
    @IsNotEmpty({ message: 'Единица измерения обязательна' })
    @Field(() => String, {
        description: 'Единица измерения',
    })
    description!: string;

    @IsString({ message: 'Ссылка на картинку ингредиента должна быть строкой' })
    @IsNotEmpty({ message: 'Ссылка на картинку ингредиента обязательна' })
    @Field(() => String, {
        description: 'Ссылка на картинку ингредиента',
    })
    iconUrl!: string;

    @IsNotEmpty({ message: 'Цена ингредиента обязательна' })
    @IsNumber({}, { message: 'Цена ингредиента должна быть числом' })
    @Field(() => Number, { description: 'Цена ингредиента' })
    price!: number;
}
