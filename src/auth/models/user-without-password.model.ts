import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from 'prisma/generated/prisma/client';

@ObjectType()
export class UserWithOutPassword {
    @Field(() => String)
    id: string;
    @Field(() => String)
    email: string;
    @Field(() => Role, { defaultValue: Role.USER })
    role: Role;
    @Field(() => Date)
    createdAt: Date;
    @Field(() => Date)
    updatedAt: Date;
}
