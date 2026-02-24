import {
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';

import type { User } from 'prisma/generated/prisma/client';
import { Role, TokenType } from 'prisma/generated/prisma/enums';

import type { UserMetadata } from 'src/common/interfaces';
import { getMetadata, IsDev, ms } from 'src/common/utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { TelegramService } from 'src/telegram/telegram.service';
import { UsersService } from 'src/users/users.service';

import { EmailConfirmationService } from './email-confirmation/email-confirmation.service';
import { TwoFactorService } from './two-factor/two-factor.service';

import type { LoginInput, RegisterInput } from './inputs';
import type { JwtPayload } from './interfaces';
import type { Request, Response } from 'express';
import type { StringValue } from 'ms';

@Injectable()
export class AuthService {
    private readonly COOKIE_DOMAIN: string;
    private readonly JWT_ACCESS_TOKEN_TTL: StringValue;
    private readonly JWT_REFRESH_TOKEN_TTL: StringValue;
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
        private readonly configService: ConfigService,
        private readonly emailConfirmationService: EmailConfirmationService,
        private readonly twoFactorService: TwoFactorService,
        private readonly telegramService: TelegramService,
    ) {
        this.JWT_ACCESS_TOKEN_TTL = this.configService.getOrThrow<StringValue>(
            'JWT_ACCESS_TOKEN_TTL',
        );
        this.JWT_REFRESH_TOKEN_TTL = this.configService.getOrThrow<StringValue>(
            'JWT_REFRESH_TOKEN_TTL',
        );
        this.COOKIE_DOMAIN =
            this.configService.getOrThrow<string>('COOKIE_DOMAIN');
    }

    async register(input: RegisterInput) {
        const { fullName, email, password } = input;

        const existedUser = await this.prismaService.user.findUnique({
            where: {
                email,
            },
        });

        if (existedUser) {
            throw new ConflictException('Пользователь уже зарегистрирован !');
        }

        const newUser = await this.prismaService.user.create({
            data: {
                fullName,
                email,
                password: await hash(password),
            },
        });

        await this.emailConfirmationService.sendVerificationToken(newUser);

        return {
            success: true,
            email: newUser.email,
        };
    }

    async login(
        req: Request,
        res: Response,
        input: LoginInput,
        userAgent: string,
    ) {
        const { email, password, token } = input;
        const userMetadata: UserMetadata = getMetadata(req, userAgent);

        const existedUser = await this.userService.findByEmail(email);

        if (!existedUser) {
            throw new NotFoundException('Пользователь не найден !');
        }

        const isValidPassword = await verify(existedUser.password, password);

        if (!isValidPassword) {
            throw new NotFoundException('Пользователь не найден !');
        }

        if (!existedUser.isVerified) {
            await this.emailConfirmationService.sendVerificationToken(
                existedUser,
            );
            throw new ForbiddenException(
                'Ваш email не подтвержден. Пожалуйста, проверьте вашу почту и подтвердите ваш аккаунт.',
            );
        }

        if (existedUser.isTwoFactorEnabled) {
            if (!token) {
                await this.twoFactorService.sendTwoFactorToken(
                    existedUser,
                    userMetadata,
                );

                return { message: 'Необходим код двухфакторной авторизации !' };
            }
            const twoFactorToken = await this.prismaService.token.findFirst({
                where: {
                    userId: existedUser.id,
                    type: TokenType.TWO_FACTOR,
                },
            });

            if (!twoFactorToken) {
                return {
                    message: 'Необходим код двухфакторной авторизации !',
                };
            }

            const isValid = token === twoFactorToken.token;

            if (!isValid) {
                throw new ForbiddenException(
                    'Ваш код не верен, пожалуйста убедитесь что у вас правильный код!',
                );
            }

            await this.prismaService.token.deleteMany({
                where: {
                    userId: existedUser.id,
                    type: TokenType.TWO_FACTOR,
                },
            });
        }

        const { device, ip, location } = userMetadata;

        const userEvent = await this.prismaService.userSecurityEvent.findFirst({
            where: {
                userId: existedUser.id,
            },
        });

        if (!userEvent) {
            await this.prismaService.userSecurityEvent.create({
                data: {
                    userId: existedUser.id,
                    ip: ip,
                    userAgent,
                    type: 'LOGIN',
                    country: location.country,
                    os: device.os,
                    browser: device.browser,
                    lat: location.latitude,
                    lon: location.longitude,
                    city: location.city,
                    deviceType: device.type,
                },
            });

            await this.telegramService.newUser(userMetadata, existedUser);
        }

        return this.auth(res, existedUser);
    }

    async logout(res: Response) {
        this.setCookie(res, 'refreshToken', new Date(0));

        return true;
    }

    async validate(id: string) {
        const user = await this.userService.findById(id);

        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }

        return user;
    }

    async refresh(req: Request, res: Response) {
        const refreshToken: string = req.cookies['refreshToken'] as string;

        if (!refreshToken) {
            throw new UnauthorizedException('Не действительный токен');
        }

        const payload: JwtPayload =
            await this.jwtService.verifyAsync(refreshToken);

        if (payload) {
            const user = await this.userService.findById(payload.id);

            if (!user) {
                throw new NotFoundException('Пользователь не найден');
            }

            return this.auth(res, user);
        }

        throw new UnauthorizedException('Не действительный токен');
    }

    private async auth(res: Response, user: Omit<User, 'password'>) {
        const { accessToken, refreshToken } = this.generateTokens(
            user.id,
            user.role,
        );

        this.setCookie(
            res,
            refreshToken,
            new Date(Date.now() + ms(this.JWT_REFRESH_TOKEN_TTL)),
        );

        return { accessToken, user };
    }

    private generateTokens(id: string, role: Role) {
        const payload: JwtPayload = { id, role };

        const accessToken = this.jwtService.sign(payload, {
            expiresIn: this.JWT_ACCESS_TOKEN_TTL,
        });

        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.JWT_REFRESH_TOKEN_TTL,
        });

        return { accessToken, refreshToken };
    }

    private setCookie(res: Response, value: string, expires: Date) {
        res.cookie('refreshToken', value, {
            httpOnly: true,
            domain: this.COOKIE_DOMAIN,
            expires,
            sameSite: IsDev(this.configService) ? 'none' : 'strict',
            secure: true,
        });
    }
}
