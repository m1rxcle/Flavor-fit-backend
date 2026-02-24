import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegisterResponse {
    @Field(() => Boolean, { description: 'Успешность регистрации' })
    success!: boolean;
    @Field(() => String, {
        description: 'Email зарегистрированного пользователя',
    })
    email!: string;
}
