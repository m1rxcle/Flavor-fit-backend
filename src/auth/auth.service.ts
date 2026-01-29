import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { Role } from 'prisma/generated/prisma/enums';

import { IsDev, ms } from 'src/common/utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

import { LoginInput, RegisterInput } from './inputs';

import type { JwtPayload } from './interfaces';
import type { Request, Response } from 'express';
import type { StringValue } from 'ms';
import type { User } from 'prisma/generated/prisma/client';

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

    async register(res: Response, input: RegisterInput) {
        const { fullName, email, password } = input;

        const existedUser = await this.prismaService.user.findUnique({
            where: {
                email,
            },
        });

        if (existedUser) {
            throw new ConflictException('Пользователь уже зарегистрирован');
        }

        const newUser = await this.prismaService.user.create({
            data: {
                fullName,
                email,
                password: await hash(password),
            },
        });

        return this.auth(res, newUser);
    }

    async login(res: Response, input: LoginInput) {
        const { email, password } = input;

        const existedUser = await this.userService.findByEmail(email);

        if (!existedUser) {
            throw new NotFoundException('Пользователь не найден');
        }

        const isValidPassword = await verify(existedUser.password, password);

        if (!isValidPassword) {
            throw new NotFoundException('Пользователь не найден');
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
