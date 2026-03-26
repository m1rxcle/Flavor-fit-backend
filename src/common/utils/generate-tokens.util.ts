import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid';

import { TokenType, type User } from 'prisma/generated/prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

import type { GeneratedToken } from '../interfaces';

/**
 * Генерирует токен код для пользователя и сохраняет его в базе данных.
 *
 * В зависимости от типа токена, функция может:
 * - Ограничивать частоту создания токена (например, для PASSWORD_RESET)
 * - Удалять предыдущие токены того же типа перед созданием нового
 *
 * @param user - Объект пользователя (User), для которого создаётся токен.
 * @param type - Тип токена (TokenType), определяет назначение токена:
 *   - TokenType.PASSWORD_RESET — токен для сброса пароля
 *   - TokenType.TWO_FACTOR — токен для двухфакторной аутентификации и др.
 *   - TokenType.VERIFICATION — токен для подтверждения электронной почты
 * @param prismaService - Экземпляр PrismaService для работы с базой данных.
 *
 * @throws {NotFoundException} Если пользователь не найден в базе данных.
 * @throws {BadRequestException} Если пользователь пытается создать PASSWORD_RESET токен слишком часто.
 *
 * @returns {Promise<GeneratedToken>}
 * Возвращает объект созданного токена, содержащий его идентификатор, тип, срок действия и связанные данные пользователя.
 *
 * @example
 * ```ts
 * const token = await generateTokens(user, TokenType.PASSWORD_RESET, prismaService);
 * console.log(token.token); // например, '519014'
 * ```
 */
export const generateTokens = async (
    user: User,
    type: TokenType,
    prismaService: PrismaService,
): Promise<GeneratedToken> => {
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    const uuidToken = uuid.v4();
    const expiresIn = new Date(new Date().getTime() + 10 * 60 * 1000);

    const currentUser = await prismaService.user.findUnique({
        where: {
            email: user.email,
        },
    });

    if (!currentUser) {
        throw new NotFoundException('Пользователь не найден');
    }

    if (type === TokenType.PASSWORD_RESET) {
        const lastToken = await prismaService.token.findFirst({
            where: {
                userId: currentUser.id,
                type: TokenType.PASSWORD_RESET,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        //TODO: НА ПРОДАКШЕНЕ ПЕРЕДЕЛАТЬ НА 1 ЧАС (60 * 60 * 1000), СЕЙЧАС 1 МИНУТА
        const oneHour = 60 * 1000;

        if (lastToken && Date.now() - lastToken.createdAt.getTime() < oneHour) {
            throw new BadRequestException(
                'Вы можете запросить смену пароля только раз в 1 час.',
            );
        }
    }

    await prismaService.token.deleteMany({
        where: {
            userId: user.id,
            type: type,
        },
    });

    const requiredToken = await prismaService.token.create({
        data: {
            userId: user.id,
            email: currentUser.email,
            token: type === TokenType.PASSWORD_RESET ? uuidToken : token,
            expiresIn,
            type: type,
        },
    });

    return requiredToken;
};
