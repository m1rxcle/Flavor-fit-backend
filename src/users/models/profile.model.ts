import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

import { Genders } from 'prisma/generated/prisma/enums';

registerEnumType(Genders, {
    name: 'Genders',
    description: 'Гендеры пользователей',
    valuesMap: {
        MALE: { description: 'Мужской' },
        FEMALE: { description: 'Женский' },
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
    @MinLength(2, { message: 'Полное имя должно быть не менее 2 символов' })
    @Field(() => String, {
        description: 'Полное имя пользователя',
        nullable: true,
    })
    fullName: string;
    @IsString({ message: 'Биография должна быть строкой' })
    @IsOptional({ message: 'Биография не обязательна' })
    @Field(() => String, {
        nullable: true,
        description: 'Биография пользователя',
    })
    bio?: string;
    @IsString({ message: 'Ссылка должна быть строкой' })
    @IsOptional({ message: 'Ссылка не обязательна' })
    @Field(() => String, {
        nullable: true,
        description: 'Ссылка на картинку профиля',
    })
    imageUrl?: string;
    @IsNumber({}, { message: 'Возраст должен быть числом' })
    @IsOptional({ message: 'Возраст не обязателен' })
    @Field(() => Int, {
        nullable: true,
        description: 'Возраст пользователя',
    })
    age?: number;
    @IsEnum(Genders, { message: 'Пол должен быть указан' })
    @Field(() => Genders, {
        defaultValue: Genders.MALE,
        description: 'Пол пользователя',
    })
    gender: Genders;
    @IsString({ message: 'Ссылка должна быть строкой' })
    @IsOptional({ message: 'Ссылка не обязательна' })
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
    updatedAt: Date;
}
