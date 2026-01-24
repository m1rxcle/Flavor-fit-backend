import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from 'prisma/generated/prisma/enums';

@ObjectType()
export class UserData {
    @Field(() => String)
    id: string;
    @Field(() => String)
    email: string;
    @Field(() => Role)
    role: Role;
}
