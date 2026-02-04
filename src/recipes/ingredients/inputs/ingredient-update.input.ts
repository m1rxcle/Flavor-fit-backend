import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';

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

@InputType({ description: 'Обновление ингредиента' })
export class IngredientUpdateInput implements Partial<Ingredient> {
    @IsString({ message: 'Название ингредиента должно быть строкой' })
    @IsOptional({ message: 'Название ингредиента не обязательно' })
    @Field(() => String, {
        description: 'Название ингредиента',
        nullable: true,
    })
    title?: string;
    @IsEnum(Unit, { message: 'Единица измерения должна быть выбрана' })
    @IsOptional({ message: 'Единица измерения не обязательна' })
    @Field(() => Unit, {
        description: 'Единица измерения',
        nullable: true,
    })
    defaultUnit?: Unit;
}
