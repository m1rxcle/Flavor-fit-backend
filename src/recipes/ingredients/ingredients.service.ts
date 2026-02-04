import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import type { Ingredient } from 'prisma/generated/prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

import type { IngredientInput, IngredientUpdateInput } from './inputs';

@Injectable()
export class IngredientsService {
    public constructor(private readonly prismaService: PrismaService) {}

    public async findAll(): Promise<Ingredient[]> {
        const ingredients: Ingredient[] =
            await this.prismaService.ingredient.findMany({
                orderBy: { title: 'asc' },
            });

        if (ingredients.length === 0) {
            throw new NotFoundException('У вас пока что нет ингредиентов');
        }

        return ingredients;
    }

    public async findById(id: string): Promise<Ingredient> {
        const ingredient: Ingredient | null =
            await this.prismaService.ingredient.findUnique({
                where: { id },
            });

        if (!ingredient) {
            throw new NotFoundException(
                `Ингредиента с таким ID(${id}) не существует`,
            );
        }

        return ingredient;
    }

    public async create(input: IngredientInput): Promise<Ingredient> {
        const { title, defaultUnit } = input;

        const existedIngredient = await this.prismaService.ingredient.findFirst(
            {
                where: { title },
            },
        );

        if (existedIngredient) {
            throw new BadRequestException(
                `Ингредиент "${title}" уже существует`,
            );
        }

        return await this.prismaService.ingredient.create({
            data: {
                title,
                defaultUnit,
            },
        });
    }

    public async update(
        id: string,
        input: IngredientUpdateInput,
    ): Promise<Ingredient> {
        const { title, defaultUnit } = input;

        const ingredient: Ingredient =
            await this.prismaService.ingredient.update({
                where: { id },
                data: {
                    title,
                    defaultUnit,
                },
            });

        if (!ingredient) {
            throw new NotFoundException('Такого ингредиента не существует');
        }

        return ingredient;
    }

    public async delete(id: string): Promise<boolean> {
        const ingredient: Ingredient =
            await this.prismaService.ingredient.delete({
                where: { id },
            });

        if (!ingredient) {
            throw new NotFoundException(
                `Ингредиента с таким ID(${id}) не существует`,
            );
        }

        return true;
    }
}
