import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { hash, verify } from 'argon2';

import { Prisma, type User } from 'prisma/generated/prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

import type {
    ChangeEmailInput,
    ChangePasswordInput,
    UserUpdateInput,
} from './inputs';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll() {
        const users = await this.prisma.user.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                profile: true,
                measurements: true,
            },
        });

        if (!users) {
            throw new NotFoundException('Пользователь не найден');
        }

        return users;
    }

    async findById(id: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                profile: true,
                measurements: true,
            },
        });

        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }

        return user;
    }

    async findByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }

        return user;
    }

    async changePassword(user: User, input: ChangePasswordInput) {
        const { newPassword, oldPassword } = input;

        const isValidPassword = await verify(user.password, oldPassword);

        if (!isValidPassword) {
            throw new UnauthorizedException(
                'Вы ввели неверный старый пароль. Пожалуйста, повторите попытку.',
            );
        }

        await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: await hash(newPassword),
            },
        });

        return true;
    }

    async changeEmail(user: User, input: ChangeEmailInput) {
        const { newEmail } = input;

        const existedUserWithNewEmail = await this.prisma.user.findUnique({
            where: {
                email: newEmail,
            },
        });

        if (existedUserWithNewEmail) {
            throw new Error('Пользователь с таким email уже зарегистрирован');
        }

        await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                email: newEmail,
                isVerified: false,
            },
        });

        return true;
    }

    async updateProfile(id: string, input: UserUpdateInput) {
        const user = await this.findById(id);

        const { profile, measurements, ...data } = input;

        const updateProfile: Prisma.XOR<
            Prisma.UserUpdateInput,
            Prisma.UserUncheckedUpdateInput
        > = profile
            ? {
                  profile: {
                      upsert: {
                          create: profile,
                          update: profile,
                      },
                  },
              }
            : {};

        const updateMeasurements: Prisma.XOR<
            Prisma.UserUpdateInput,
            Prisma.UserUncheckedUpdateInput
        > = measurements
            ? {
                  measurements: {
                      upsert: {
                          create: measurements,
                          update: measurements,
                      },
                  },
              }
            : {};

        return this.prisma.user.update({
            where: { id },
            data: {
                ...data,
                ...updateProfile,
                ...updateMeasurements,
                fullName: profile?.fullName || user.fullName,
            },
            include: {
                profile: true,
                measurements: true,
            },
        });
    }
}
