import {
    BadRequestException,
    Inject,
    Injectable,
    type CanActivate,
    type ExecutionContext,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { TurnstileService } from 'nest-cloudflare-turnstile/dist/services/turnstile.service';

import { GraphQLContext } from 'src/common/interfaces';

interface ITurnstileResponse {
    success: boolean;
    challenge_ts?: string;
    hostname?: string;
    errorCodes?: string;
    action?: string;
    cdata?: string;
}

@Injectable()
export class CaptchaGuard implements CanActivate {
    constructor(
        private readonly turnstileService: TurnstileService,
        @Inject('TurnstileServiceOptions')
        private readonly options: { secretKey: string },
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const gqlContext = GqlExecutionContext.create(context);

        const request = gqlContext.getContext<GraphQLContext>().req;

        const token = request.headers['cf-turnstile-token'];

        if (!token) {
            throw new BadRequestException('Не указан токен Turnstile');
        }

        const { success } = (await this.turnstileService.validateToken(
            token as string,
        )) as ITurnstileResponse;

        if (!success) {
            throw new BadRequestException('Неверный токен Turnstile');
        }

        return true;
    }
}
