import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikesService {
    public constructor(private readonly prismaService: PrismaService) {}

    public async toggle(
        recipeId: string,
        userId: string,
    ): Promise<{ isLiked: boolean }> {
        const isLiked = await this.prismaService.like.findUnique({
            where: {
                userId_recipeId: {
                    userId,
                    recipeId,
                },
            },
        });

        if (isLiked) {
            await this.prismaService.like.delete({
                where: {
                    userId_recipeId: {
                        recipeId,
                        userId,
                    },
                },
            });

            return {
                isLiked: false,
            };
        }

        await this.prismaService.like.create({
            data: {
                recipeId,
                userId,
            },
        });

        return {
            isLiked: true,
        };
    }

    public async getAllFromRecipe(recipeId: string): Promise<number> {
        const likes = await this.prismaService.like.findMany({
            where: {
                recipeId,
            },
        });

        return likes.length;
    }
}
