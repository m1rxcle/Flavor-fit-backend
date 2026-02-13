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
        const ingredients = await this.prismaService.ingredient.findMany({
            orderBy: { title: 'asc' },
        });

        if (ingredients.length === 0) {
            throw new NotFoundException('У вас пока что нет ингредиентов');
        }

        return ingredients;
    }

    public async findById(id: string): Promise<Ingredient> {
        const ingredient = await this.prismaService.ingredient.findUnique({
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
        const { title, iconUrl, description, price } = input;

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
                description,
                iconUrl,
                price,
            },
        });
    }

    public async update(
        id: string,
        input: IngredientUpdateInput,
    ): Promise<Ingredient> {
        const { title, description, iconUrl, price } = input;

        const ingredient = await this.prismaService.ingredient.findUnique({
            where: { id },
        });

        if (!ingredient) {
            throw new NotFoundException('Такого ингредиента не существует');
        }

        const updatedIngredient = await this.prismaService.ingredient.update({
            where: { id: ingredient.id },
            data: {
                title,
                description,
                iconUrl,
                price,
            },
        });

        return updatedIngredient;
    }

    public async delete(id: string): Promise<boolean> {
        const ingredient = await this.prismaService.ingredient.findUnique({
            where: { id },
        });

        if (!ingredient) {
            throw new NotFoundException(
                `Ингредиента с таким ID(${id}) не существует`,
            );
        }

        await this.prismaService.ingredient.delete({
            where: { id },
        });

        return true;
    }
}
