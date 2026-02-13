import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
    IsEmail,
    IsOptional,
    IsString,
    MinLength,
    ValidateNested,
} from 'class-validator';

import { BodyMeasurementInput } from './measurement.input';
import { ProfileInput } from './profile.input';

@InputType({ description: 'Данные пользователя которые могут быть изменены' })
export class UserUpdateInput {
    @IsString({ message: 'Поле email должно быть строкой' })
    @IsOptional({ message: 'Поле email не обязательно' })
    @IsEmail({}, { message: 'Поле email некорректно' })
    @Field(() => String, {
        description: 'Почта пользователя',
        nullable: true,
    })
    email?: string | undefined;
    @IsString({ message: 'Полное имя должно быть строкой' })
    @IsOptional({ message: 'Полное имя не обязательно' })
    @MinLength(2, { message: 'Полное имя должно быть не менее 2 символов' })
    @Field(() => String, {
        description: 'Полное имя пользователя',
        nullable: true,
    })
    fullName?: string | undefined;
    @ValidateNested()
    @Type(() => ProfileInput)
    @IsOptional({ message: 'Поле profile не обязательно' })
    @Field(() => ProfileInput, {
        description: 'Профиль пользователя',
        nullable: true,
    })
    profile?: ProfileInput | undefined;
    @ValidateNested()
    @Type(() => BodyMeasurementInput)
    @IsOptional({ message: 'Поле profile не обязательно' })
    @Field(() => BodyMeasurementInput, {
        description: 'Модель измерений тела',
        nullable: true,
    })
    measurements?: BodyMeasurementInput | undefined;
}
