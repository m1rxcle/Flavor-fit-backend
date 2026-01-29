import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll() {
        const users = await this.prisma.user.findMany();

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
                profiles: true,
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
}
