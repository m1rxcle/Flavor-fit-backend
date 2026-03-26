import { BadRequestException } from '@nestjs/common';

import type { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import type { ITurnstileOptions } from 'nest-cloudflare-turnstile';

export async function getTurnstileConfig(
    configService: ConfigService,
): Promise<ITurnstileOptions> {
    const secretKey = configService.getOrThrow<string>(
        'CLOUDFLARE_TURNSTILE_SECRET_KEY',
    );

    if (!secretKey) {
        throw new BadRequestException('Указан неверный ключ Turnstile');
    }

    return {
        secretKey,
        tokenResponse: (req: Request) =>
            req.headers['cf-turnstile-token'] as string,
    };
}
