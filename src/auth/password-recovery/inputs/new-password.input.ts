import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength, Validate } from 'class-validator';

import { IsPasswordMatching } from '../decorators';

@InputType()
export class NewPasswordInput {
    @Field(() => String)
    @IsString({ message: 'Новый пароль должен быть строкой' })
    @IsNotEmpty({ message: 'Новый пароль обязателен' })
    @MinLength(6, { message: 'Новый пароль должен быть не менее 6 символов' })
    newPassword!: string;
    @Validate(IsPasswordMatching, { message: 'Пароли не совпадают' })
    @Field(() => String)
    @IsString({ message: 'Новый пароль должен быть строкой' })
    @IsNotEmpty({ message: 'Новый пароль обязателен' })
    confirmPassword!: string;
    @Field(() => String)
    @IsString({ message: 'Новый пароль должен быть строкой' })
    @IsNotEmpty({ message: 'Новый пароль обязателен' })
    token!: string;
}
