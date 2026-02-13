import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

import { Role } from 'prisma/generated/prisma/client';

import { BodyMeasurementsModel } from './measurement.model';
import { ProfileModel } from './profile.model';

registerEnumType(Role, {
    name: 'Role',
    description: 'Роли пользователей',
    valuesMap: {
        ADMIN: { description: 'Администратор с полным доступом' },
        USER: { description: 'Обычный пользователь' },
    },
});

@ObjectType({
    description: 'Модель пользователя',
})
export class UserProfileModel {
    @Field(() => ID, {
        description: 'Уникальный идентификатор пользователя',
    })
    id!: string;
    @Field(() => String, {
        description: 'Почта пользователя',
    })
    email!: string;

    @Field(() => String, {
        description: 'Полное имя пользователя',
    })
    fullName!: string;
    @Field(() => Role, {
        defaultValue: 'USER',
        description: 'Роль пользователя',
    })
    role!: Role;
    @Field(() => Boolean, {
        defaultValue: false,
        description: 'Включен ли двухфакторная аутентификация',
    })
    isTwoFactorEnabled!: boolean;
    @Field(() => Boolean, {
        defaultValue: false,
        description: 'Верифицирован ли пользователь',
    })
    isVerified!: boolean;

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
    createdAt!: Date;
    @Field(() => Date, {
        description: 'Дата обновления пользователя',
    })
    updatedAt!: Date;
}
