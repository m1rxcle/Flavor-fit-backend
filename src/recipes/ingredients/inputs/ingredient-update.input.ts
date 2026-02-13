import { Field, Float, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType({ description: 'Обновление ингредиента' })
export class IngredientUpdateInput {
    @IsString({ message: 'Название ингредиента должно быть строкой' })
    @IsOptional({ message: 'Название ингредиента не обязательно' })
    @Field(() => String, {
        description: 'Название ингредиента',
        nullable: true,
    })
    title?: string | undefined;
    @IsString({ message: 'Единица измерения должна быть строкой' })
    @IsOptional({ message: 'Единица измерения не обязательна' })
    @Field(() => String, {
        description: 'Описание ингредиента',
        nullable: true,
    })
    description?: string | undefined;
    @Field(() => String, {
        description: 'Ссылка на картинку ингредиента',
        nullable: true,
    })
    @IsString({ message: 'Ссылка на картинку ингредиента должна быть строкой' })
    @IsOptional({ message: 'Ссылка на картинку ингредиента не обязательна' })
    iconUrl?: string | undefined;

    @IsNumber({}, { message: 'Цена ингредиента должна быть числом' })
    @IsOptional({ message: 'Цена ингредиента не обязательна' })
    @Field(() => Float, { description: 'Цена ингредиента', nullable: true })
    price?: number | undefined;
}
