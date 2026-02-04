import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class ChangePasswordInput {
    @Field(() => String)
    @IsNotEmpty({ message: 'Пароль обязательно' })
    @IsString({ message: 'Пароль должно быть строкой' })
    @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
    newPassword: string;

    @Field(() => String)
    @IsNotEmpty({ message: 'Пароль обязательно' })
    @IsString({ message: 'Пароль должно быть строкой' })
    @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
    oldPassword: string;
}
