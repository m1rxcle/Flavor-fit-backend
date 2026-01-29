import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
    ActivityLevel,
    Genders,
    NutritionalGoals,
    Role,
} from 'prisma/generated/prisma/client';

registerEnumType(Role, {
    name: 'Role',
    description: 'Роли пользователей',
    valuesMap: {
        ADMIN: { description: 'Администратор с полным доступом' },
        USER: { description: 'Обычный пользователь' },
    },
});

registerEnumType(Genders, {
    name: 'Genders',
    description: 'Гендеры пользователей',
    valuesMap: {
        MALE: { description: 'Мужской' },
        FEMALE: { description: 'Женский' },
    },
});

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
    description: 'Модель профиля пользователя',
})
export class ProfileModel {
    @Field(() => ID, {
        description: 'Уникальный идентификатор профиля',
    })
    id: string;
    @Field(() => String, {
        defaultValue: 'Alan Turing',
        description: 'Полное имя пользователя',
    })
    fullName: string;
    @Field(() => String, {
        nullable: true,
        description: 'Биография пользователя',
    })
    bio: string | null;
    @Field(() => String, {
        nullable: true,
        description: 'Ссылка на картинку профиля',
    })
    imageUrl: string | null;
    @Field(() => Int, {
        nullable: true,
        description: 'Возраст пользователя',
    })
    age: number | null;
    @Field(() => Genders, {
        nullable: true,
        description: 'Пол пользователя',
    })
    gender: Genders;
    @Field(() => [String], {
        nullable: true,
        description: 'Ссылки на сайты пользователя',
    })
    sites: string[];

    @Field(() => Date, {
        description: 'Дата создания профиля',
    })
    createdAt: Date;
    @Field(() => Date, {
        description: 'Дата обновления профиля',
    })
    @Field(() => Date, {
        description: 'Дата обновления профиля',
    })
    updatedAt: Date;
}

@ObjectType({
    description: 'Модель измерений тела пользователя',
})
export class BodyMeasurementsModel {
    @Field(() => ID, {
        description: 'Уникальный идентификатор модели',
    })
    id: string;
    @Field(() => String, {
        description: 'Уникальный идентификатор пользователя',
    })
    userId: string;
    @Field(() => String, {
        nullable: true,
        description: 'Рост пользователя',
    })
    heightCm: string | null;
    @Field(() => String, {
        nullable: true,
        description: 'Вес пользователя',
    })
    weightKg: string | null;
    @Field(() => String, {
        nullable: true,
        description: 'Целевой вес пользователя',
    })
    goalWeightKg: string | null;
    @Field(() => String, {
        nullable: true,
        description: 'Обхват груди пользователя',
    })
    chestCm: string | null;
    @Field(() => String, {
        nullable: true,
        description: 'Обхват талии пользователя',
    })
    waistCm: string | null;
    @Field(() => String, {
        nullable: true,
        description: 'Обхват бедер пользователя',
    })
    thighCm: string | null;
    @Field(() => String, {
        nullable: true,
        description: 'Обхват рук пользователя',
    })
    armCm: string | null;
    @Field(() => ActivityLevel, {
        nullable: true,
        description: 'Уровень активности пользователя',
    })
    activityLevel: ActivityLevel;
    @Field(() => NutritionalGoals, {
        nullable: true,
        description: 'Цель питания пользователя',
    })
    nutritionalGoal: NutritionalGoals;

    @Field(() => Date, {
        description: 'Дата создания модели',
    })
    createdAt: Date;
    @Field(() => Date, {
        description: 'Дата обновления модели',
    })
    updatedAt: Date;
}
@ObjectType({
    description: 'Модель пользователя',
})
export class UserProfileModel {
    @Field(() => ID, {
        description: 'Уникальный идентификатор пользователя',
    })
    id: string;
    @Field(() => String, {
        defaultValue: 'alan@turing.com',
        description: 'Почта пользователя',
    })
    email: string;
    @Field(() => String, {
        defaultValue: 'Alan Turing',
        description: 'Полное имя пользователя',
    })
    fullName: string;

    @Field(() => Role, {
        defaultValue: 'USER',
        description: 'Роль пользователя',
    })
    role: Role;

    @Field(() => ProfileModel, {
        description: 'Профиль пользователя',
        nullable: true,
    })
    profile?: ProfileModel;

    @Field(() => BodyMeasurementsModel, {
        description: 'Модель измерений тела',
        nullable: true,
    })
    measurements?: BodyMeasurementsModel;

    @Field(() => Date, {
        description: 'Дата создания пользователя',
    })
    createdAt: Date;
    @Field(() => Date, {
        description: 'Дата обновления пользователя',
    })
    updatedAt: Date;
}
