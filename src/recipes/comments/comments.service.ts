import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import type { Comment, User } from 'prisma/generated/prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

import type { CreateCommentInput } from './inputs/create-comment.input';
import type { EditCommentInput } from './inputs';

@Injectable()
export class CommentsService {
    public constructor(private readonly prismaService: PrismaService) {}

    public async create(
        authorId: string,
        input: CreateCommentInput,
    ): Promise<Comment> {
        const { content, recipeId } = input;

        if (!recipeId) {
            throw new NotFoundException('Такого рецепта не существует');
        }

        return this.prismaService.comment.create({
            data: {
                recipeId,
                authorId,
                content,
            },
            include: {
                author: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
    }

    public async edit(
        id: string,
        authorId: string,
        input: EditCommentInput,
    ): Promise<Comment> {
        const { content } = input;

        const comment = await this.prismaService.comment.findUnique({
            where: { id },
            include: {
                author: {
                    include: {
                        profile: true,
                    },
                },
            },
        });

        console.log({ comment, authorId });

        if (!comment) {
            throw new NotFoundException('Такого комментария не существует');
        }

        if (comment.authorId !== authorId) {
            throw new ForbiddenException(
                'Вы не можете редактировать этот комментарий',
            );
        }

        if (!content) {
            throw new BadRequestException(
                'Текст комментария не может быть пустым',
            );
        }

        return await this.prismaService.comment.update({
            where: {
                id: comment.id,
                authorId,
            },
            data: {
                content,
            },
            include: {
                author: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
    }

    public async getAllFromRecipe(recipeId: string): Promise<Comment[]> {
        const comments = await this.prismaService.comment.findMany({
            where: {
                recipeId,
            },
            include: {
                author: {
                    include: {
                        profile: true,
                    },
                },
            },
        });

        if (!comments || comments.length === 0) {
            throw new NotFoundException(
                'К этому рецепту пока что нет комментариев',
            );
        }

        return comments;
    }

    public async delete(id: string, user: User): Promise<boolean> {
        const comment = await this.prismaService.comment.findUnique({
            where: { id },
            include: {
                author: {
                    include: {
                        profile: true,
                    },
                },
            },
        });

        if (!comment) {
            throw new NotFoundException('Такого комментария не существует');
        }

        if (comment.authorId !== user.id && user.role !== 'ADMIN') {
            throw new ForbiddenException(
                'Вы не можете удалить этот комментарий',
            );
        }

        await this.prismaService.comment.delete({
            where: { id },
        });

        return true;
    }
}
