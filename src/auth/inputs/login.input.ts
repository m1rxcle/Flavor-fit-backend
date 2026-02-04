import { Field, InputType } from '@nestjs/graphql';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
    MinLength,
} from 'class-validator';

@InputType()
export class LoginInput {
    @Field(() => String)
    @IsString({ message: 'Поле email должно быть строкой' })
    @IsNotEmpty({ message: 'Поле email обязательно' })
    @IsEmail({}, { message: 'Поле email некорректно' })
    email: string;

    @Field(() => String)
    @IsString({ message: 'Пароль должен быть строкой' })
    @IsNotEmpty({ message: 'Пароль обязателен' })
    @MinLength(6, {
        message: 'Пароль должен быть не менее 6 символов',
    })
    password: string;

    @Field(() => String, { nullable: true })
    @IsString({ message: 'Токен должен быть строкой' })
    @IsOptional()
    @Length(6, 6)
    token?: string;
}
