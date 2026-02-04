import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class RecoveryInput {
    @Field(() => String)
    @IsString({ message: 'Поле email должно быть строкой' })
    @IsEmail({}, { message: 'Поле email некорректно' })
    @IsNotEmpty({ message: 'Поле email обязательно' })
    email: string;
}
