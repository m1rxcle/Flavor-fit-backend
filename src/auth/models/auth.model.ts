import { Field, ObjectType } from '@nestjs/graphql';

import { UserProfileModel } from 'src/users/models';

@ObjectType()
export class AuthResponse {
    @Field(() => String, { description: 'Access token' })
    accessToken: string;
    @Field(() => UserProfileModel, { description: 'User profile' })
    user: UserProfileModel;
}
