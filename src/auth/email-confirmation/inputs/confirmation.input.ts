import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class ConfirmationInput {
    @Field(() => String)
    @IsNotEmpty({ message: 'Токен обязателен' })
    @IsString({ message: 'Токен должен быть строкой' })
    token: string;
}
