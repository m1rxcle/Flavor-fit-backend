import { UnauthorizedException, type ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { GraphQLContext } from 'src/common/interfaces';

export class JwtGuard extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext<GraphQLContext>().req;
    }

    handleRequest<User>(err: unknown, user: User): User {
        if (err instanceof Error) {
            throw err;
        }
        if (!user) {
            throw new UnauthorizedException('Пользователь не авторизован');
        }
        return user;
    }
}
