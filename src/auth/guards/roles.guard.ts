import {
    type CanActivate,
    type ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { GraphQLContext } from 'src/common/interfaces';

import { ROLES_KEY } from '../decorators/roles.decorator';

import type { User } from 'prisma/generated/prisma/client';
import type { Role } from 'prisma/generated/prisma/enums';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const rolesContext = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!rolesContext) return true;

        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext<GraphQLContext>().req;

        const user = request.user as User;

        if (!rolesContext.includes(user.role)) {
            throw new ForbiddenException('У вас не достаточно прав');
        }
        return true;
    }
}
