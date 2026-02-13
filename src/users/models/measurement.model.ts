import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

import { ActivityLevel, NutritionalGoals } from 'prisma/generated/prisma/enums';

registerEnumType(NutritionalGoals, {
    name: 'NutritionalGoals',
    description: 'Цели питания',
    valuesMap: {
        MAINTENANCE: { description: 'Поддержание веса' },
        WEIGHT_LOSS: { description: 'Снижение веса' },
        MUSCLE_GAIN: { description: 'Набор мышечного массы' },
    },
});

registerEnumType(ActivityLevel, {
    name: 'ActivityLevel',
    description: 'Уровень активности',
    valuesMap: {
        SEDENTARY: { description: 'Сидячий' },
        LIGHT: { description: 'Легкий' },
        MODERATE: { description: 'Средний' },
        ACTIVE: { description: 'Активный' },
        VERY_ACTIVE: { description: 'Очень активный' },
    },
});

@ObjectType({
    description: 'Модель измерений тела пользователя',
})
export class BodyMeasurementsModel {
    @Field(() => ID, {
        description: 'Уникальный идентификатор модели',
    })
    id!: string;
    @Field(() => String, {
        description: 'Уникальный идентификатор пользователя',
    })
    userId!: string;
    @IsString({ message: 'Рост должен быть строкой' })
    @IsOptional({ message: 'Рост не обязателен' })
    @Field(() => String, {
        nullable: true,
        description: 'Рост пользователя',
    })
    heightCm?: string;
    @IsString({ message: 'Вес должен быть строкой' })
    @IsOptional({ message: 'Вес не обязателен' })
    @Field(() => String, {
        nullable: true,
        description: 'Вес пользователя',
    })
    weightKg?: string;
    @IsString({ message: 'Целевой вес должен быть строкой' })
    @IsOptional({ message: 'Целевой вес не обязателен' })
    @Field(() => String, {
        nullable: true,
        description: 'Целевой вес пользователя',
    })
    goalWeightKg?: string;
    @IsString({ message: 'Обхват груди должен быть строкой' })
    @IsOptional({ message: 'Обхват груди не обязателен' })
    @Field(() => String, {
        nullable: true,
        description: 'Обхват груди пользователя',
    })
    chestCm?: string;
    @IsString({ message: 'Обхват бедер должен быть строкой' })
    @IsOptional({ message: 'Обхват бедер не обязателен' })
    @Field(() => String, {
        nullable: true,
        description: 'Обхват талии пользователя',
    })
    waistCm?: string;
    @IsString({ message: 'Обхват бедер должен быть строкой' })
    @IsOptional({ message: 'Обхват бедер не обязателен' })
    @Field(() => String, {
        nullable: true,
        description: 'Обхват бедер пользователя',
    })
    thighCm?: string;
    @IsString({ message: 'Обхват рук должен быть строкой' })
    @IsOptional({ message: 'Обхват рук не обязателен' })
    @Field(() => String, {
        nullable: true,
        description: 'Обхват рук пользователя',
    })
    armCm?: string;
    @IsOptional({ message: 'Уровень активности не обязателен' })
    @Field(() => ActivityLevel, {
        defaultValue: ActivityLevel.LIGHT,
        nullable: true,
        description: 'Уровень активности пользователя',
    })
    activityLevel?: ActivityLevel | undefined;
    @IsOptional({ message: 'Цель питания не обязательна' })
    @Field(() => NutritionalGoals, {
        defaultValue: NutritionalGoals.WEIGHT_LOSS,
        nullable: true,
        description: 'Цель питания пользователя',
    })
    nutritionalGoal?: NutritionalGoals | undefined;

    @Field(() => Date, {
        description: 'Дата создания модели',
    })
    createdAt!: Date;
    @Field(() => Date, {
        description: 'Дата обновления модели',
    })
    updatedAt!: Date;
}
