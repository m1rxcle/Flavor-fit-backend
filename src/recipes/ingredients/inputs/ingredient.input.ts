import { Field, InputType, registerEnumType } from '@nestjs/graphql';
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
            description: 'Кусок/Штука',
        },
        TABLESPOON: {
            description: 'Столовая ложка',
        },
        TEASPOON: {
            description: 'Чайная ложка',
        },
    },
});

@InputType({ description: 'Ингредиент' })
export class IngredientInput implements Partial<Ingredient> {
    @IsString({ message: 'Название ингредиента должно быть строкой' })
    @IsNotEmpty({ message: 'Название ингредиента обязательно' })
    @Field(() => String, {
        description: 'Название ингредиента',
    })
    title: string;
    @IsEnum(Unit, { message: 'Единица измерения должна быть выбрана' })
    @IsNotEmpty({ message: 'Единица измерения обязательна' })
    @Field(() => Unit, {
        description: 'Единица измерения',
    })
    defaultUnit: Unit;
}
