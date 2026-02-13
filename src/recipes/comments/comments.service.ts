import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import type { Comment, User } from 'prisma/generated/prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

import type { CommentInput } from './inputs/comment.input';

@Injectable()
export class CommentsService {
    public constructor(private readonly prismaService: PrismaService) {}

    public async create(
        authorId: string,
        input: CommentInput,
    ): Promise<Comment> {
        const { content, recipeId } = input;
        return this.prismaService.comment.create({
            data: {
                recipeId,
                authorId,
                content,
            },
        });
    }

    public async edit(
        id: string,
        authorId: string,
        input: CommentInput,
    ): Promise<boolean> {
        const { content } = input;

        const comment = await this.prismaService.comment.findUnique({
            where: { id },
            include: {
                author: true,
            },
        });

        if (!comment) {
            throw new NotFoundException('Такого комментария не существует');
        }

        if (comment.authorId !== authorId) {
            throw new ForbiddenException(
                'Вы не можете редактировать этот комментарий',
            );
        }

        await this.prismaService.comment.update({
            where: {
                id: comment.id,
                authorId,
            },
            data: {
                content,
            },
            include: {
                author: true,
            },
        });

        return true;
    }

    public async getAllFromRecipe(recipeId: string): Promise<Comment[]> {
        const comments = await this.prismaService.comment.findMany({
            where: {
                recipeId,
            },
            include: {
                author: true,
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
                author: true,
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
