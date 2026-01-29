import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'prisma/generated/prisma/client';

import type { GraphQLContext } from 'src/common/interfaces';

export const Authorized = createParamDecorator(
    (data: keyof User, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context);

        const request = ctx.getContext<GraphQLContext>().req;

        const user = request.user as User;

        return data ? user[data] : user;
    },
);
