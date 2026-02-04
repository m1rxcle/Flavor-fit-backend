import { Field, ObjectType } from '@nestjs/graphql';

import { UserProfileModel } from 'src/users/models';

@ObjectType()
export class AuthResponse {
    @Field(() => String, { description: 'Access token', nullable: true })
    accessToken: string;
    @Field(() => UserProfileModel, {
        description: 'Профиль пользователя',
        nullable: true,
    })
    user?: UserProfileModel;

    @Field(() => String, {
        description: 'Кастомное сообщение',
        nullable: true,
    })
    message?: string;
}
