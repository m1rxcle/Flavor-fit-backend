import { ConfigService } from '@nestjs/config';

/**
 * Проверяет, находится ли приложение в режиме разработки.
 *
 * Использует ConfigService для получения значения переменной окружения `MODE`.
 * Если `MODE` равно `'development'`, функция вернёт `true`, иначе `false`.
 *
 * @param configService - Экземпляр ConfigService для доступа к конфигурации приложения.
 *
 * @returns {boolean} `true`, если режим разработки, иначе `false`.
 *
 * @throws {Error} Если переменная окружения `MODE` не задана, выбрасывается исключение.
 *
 * @example
 * ```ts
 * const isDev = IsDev(configService);
 * if (isDev) {
 *   console.log('Приложение запущено в режиме разработки');
 * }
 * ```
 */
export const IsDev = (configService: ConfigService): boolean =>
    configService.getOrThrow<string>('MODE') === 'development';
