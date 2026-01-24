import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService) {}

    async register(dto: { email: string; password: string }) {
        const existedUser = await this.prismaService.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (existedUser) {
            throw new ForbiddenException('User already exists');
        }

        const newUser = await this.prismaService.user.create({
            data: {
                email: dto.email,
                password: await argon2.hash(dto.password),
            },
        });

        const { password, ...userWithOutPassword } = newUser;

        return userWithOutPassword;
    }
}
