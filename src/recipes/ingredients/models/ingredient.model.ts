import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { Ingredient, Unit } from 'prisma/generated/prisma/client';

registerEnumType(Unit, {
    description: 'Единица измерения',
    name: 'Unit',
    valuesMap: {
        CLOVES: {
            description: 'Дольки',
        },
        CUP: {
            description: 'Чашка',
        },
        GRAM: {
            description: 'Грамм',
        },
        MILLILITER: {
            description: 'Миллилитр',
        },
        PIECE: {
            description: 'Кусок',
        },
        TABLESPOON: {
            description: 'Столовая ложка',
        },
        TEASPOON: {
            description: 'Чайная ложка',
        },
    },
});

@ObjectType()
export class IngredientModel implements Ingredient {
    @IsString({ message: 'ID ингредиента должно быть строкой' })
    @IsNotEmpty({ message: 'ID ингредиента обязателен' })
    @Field(() => ID, { description: 'ID ингредиента' })
    id: string;
    @IsString({ message: 'Название ингредиента должно быть строкой' })
    @IsNotEmpty({ message: 'Название ингредиента обязателен' })
    @Field(() => String, { description: 'Название ингредиента' })
    title: string;
    @IsEnum(Unit, { message: 'Единица измерения должна быть выбрана' })
    @IsNotEmpty({ message: 'Единица измерения обязательна' })
    @Field(() => Unit, { description: 'Единица измерения' })
    defaultUnit: Unit;

    @Field(() => Date, { description: 'Дата создания ингредиента' })
    createdAt: Date;
    @Field(() => Date, { description: 'Дата обновления ингредиента' })
    updatedAt: Date;
}
