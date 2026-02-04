import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

import { Genders } from 'prisma/generated/prisma/enums';

import { ProfileModel } from '../models';

@InputType({
    description: 'Данные профиля пользователя которые можно изменить',
})
export class ProfileInput extends PartialType(ProfileModel) {
    @IsString({ message: 'Полное имя должно быть строкой' })
    @IsOptional({ message: 'Полное имя не обязательно' })
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
    @Field(() => String, {
        nullable: true,
        description: 'Ссылка на картинку профиля',
    })
    @IsString({ message: 'Ссылка должна быть строкой' })
    @IsOptional({ message: 'Ссылка не обязательна' })
    imageUrl?: string;
    @IsNumber({}, { message: 'Возраст должен быть числом' })
    @IsOptional({ message: 'Возраст не обязателен' })
    @Field(() => Int, {
        nullable: true,
        description: 'Возраст пользователя',
    })
    age?: number;

    @Field(() => Genders, {
        nullable: true,
        description: 'Пол пользователя',
    })
    gender?: Genders;

    @IsOptional({ message: 'Ссылки на сайты не обязательны' })
    @IsString({ message: 'Ссылка должна быть строкой' })
    @Field(() => [String], {
        nullable: true,
        description: 'Ссылки на сайты пользователя',
    })
    sites: string[];
}
