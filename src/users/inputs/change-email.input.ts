import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class ChangeEmailInput {
    @Field(() => String)
    @IsNotEmpty({ message: 'Поле email обязательно' })
    @IsString({ message: 'Поле email должно быть строкой' })
    @IsEmail({}, { message: 'Поле email некорректно' })
    newEmail: string;
}
