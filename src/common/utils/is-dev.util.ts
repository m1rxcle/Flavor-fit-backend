import { ConfigService } from '@nestjs/config';

export const IsDev = (configService: ConfigService): boolean =>
    configService.getOrThrow<string>('MODE') === 'development';
