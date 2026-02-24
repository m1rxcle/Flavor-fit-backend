import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';

import type { Recipe, User } from 'prisma/generated/prisma/client';

import { SortByEnum } from 'src/common/enums/sort-by.enum';
import { PrismaService } from 'src/prisma/prisma.service';

import type { RecipeCreateInput, RecipeUpdateInput } from './inputs';

@Injectable()
export class RecipesService {
    public constructor(private readonly prismaService: PrismaService) {}

    // filters(category,tags, searchTerm(title,description,ingredients)), sorting(default, recommended(likes), popularity(views)),

    public async search(searchTerm: string): Promise<Recipe[]> {
        const recipes = await this.prismaService.recipe.findMany({
            include: {
                recipeIngredients: {
                    include: {
                        ingredient: true,
                    },
                },
                author: true,
                tag: true,
            },
            where: {
                OR: [
                    {
                        title: {
                            contains: searchTerm,
                            mode: 'insensitive',
                        },
                    },
                    {
                        description: {
                            contains: searchTerm,
                            mode: 'insensitive',
                        },
                    },
                    { slug: { contains: searchTerm, mode: 'insensitive' } },
                    {
                        recipeIngredients: {
                            some: {
                                ingredient: {
                                    title: {
                                        contains: searchTerm,
                                        mode: 'insensitive',
                                    },
                                },
                            },
                        },
                    },
                    {
                        tag: {
                            some: {
                                name: {
                                    contains: searchTerm,
                                    mode: 'insensitive',
                                },
                            },
                        },
                    },
                    {
                        author: {
                            OR: [
                                {
                                    fullName: {
                                        contains: searchTerm,
                                        mode: 'insensitive',
                                    },
                                },
                                {
                                    email: {
                                        contains: searchTerm,
                                        mode: 'insensitive',
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        });

        return recipes;
    }

    public async sort(sortBy: SortByEnum) {
        let orderBy = {};

        switch (sortBy) {
            case SortByEnum.POPULARITY:
                orderBy = { views: { _count: 'desc' } };
                break;
            case SortByEnum.RECOMMENDED:
                orderBy = { likes: { _count: 'desc' } };
                break;
            default:
                orderBy = { createdAt: 'desc' };
        }

        const recipes = await this.prismaService.recipe.findMany({
            orderBy,
            include: {
                author: true,
                likes: true,
                nutritionFact: true,
                recipeIngredients: {
                    include: {
                        ingredient: true,
                    },
                },
                recipeStep: true,
                tag: true,
                views: true,
                comments: true,
            },
        });

        return recipes;
    }

    public async getFilters() {
        const difficulties = await this.prismaService.recipe.findMany({
            select: { difficulty: true },
            distinct: ['difficulty'],
        });

        const tags = await this.prismaService.recipeTag.findMany({
            select: { name: true },
            distinct: ['name'],
        });

        return {
            difficulties: difficulties.map(difficulty => difficulty.difficulty),
            tags: tags.map(tag => tag.name),
        };
    }

    public async getAll(take: number = 10) {
        const recipes = await this.prismaService.recipe.findMany({
            orderBy: {
                title: 'asc',
            },
            include: {
                author: true,
                nutritionFact: true,
                recipeIngredients: {
                    include: {
                        ingredient: true,
                    },
                },
                recipeStep: true,
                tag: true,
                likes: true,
                comments: true,
                views: true,
            },
            take,
        });

        if (recipes.length === 0) {
            throw new NotFoundException('У вас пока что нет рецептов');
        }

        return recipes;
    }

    public async getBySlug(userId: string, slug: string): Promise<Recipe> {
        const recipe = await this.prismaService.recipe.findUnique({
            where: { slug },
            include: {
                author: true,
                nutritionFact: true,
                recipeIngredients: {
                    include: {
                        ingredient: true,
                    },
                },
                recipeStep: true,
                tag: true,
                likes: true,
                comments: true,
                views: true,
            },
        });

        if (!recipe) {
            throw new NotFoundException(
                `Рецепта с таким SLUG(${slug}) не существует`,
            );
        }

        const existingView = await this.prismaService.view.findUnique({
            where: {
                userId_recipeId: {
                    recipeId: recipe.id,
                    userId,
                },
            },
        });

        if (!existingView) {
            await this.prismaService.view.create({
                data: {
                    recipe: {
                        connect: {
                            id: recipe.id,
                        },
                    },
                    user: {
                        connect: {
                            id: userId,
                        },
                    },
                },
            });
        }

        return recipe;
    }

    public async getById(id: string): Promise<Recipe> {
        const recipe = await this.prismaService.recipe.findUnique({
            where: { id },
            include: {
                author: true,
                likes: true,
                nutritionFact: true,
                recipeIngredients: {
                    include: {
                        ingredient: true,
                    },
                },
                recipeStep: true,
                tag: true,
            },
        });

        if (!recipe) {
            throw new NotFoundException(
                `Рецепта с таким ID(${id}) не существует`,
            );
        }

        return recipe;
    }

    public async create(authorId: string, input: RecipeCreateInput) {
        const { nutritionFact, recipeIngredients, recipeStep, slug, tag } =
            input;

        const existedRecipe = await this.prismaService.recipe.findUnique({
            where: { slug },
        });

        if (existedRecipe) {
            throw new BadRequestException(`Рецепт "${slug}" уже существует`);
        }

        const recipe = await this.prismaService.recipe.create({
            data: {
                ...input,
                author: {
                    connect: {
                        id: authorId,
                    },
                },
                tag: {
                    connectOrCreate: tag.map(item => ({
                        where: { name: item.name },
                        create: { name: item.name },
                    })),
                },
                nutritionFact: {
                    create: {
                        proteins: nutritionFact.proteins,
                        fats: nutritionFact.fats,
                        carbohydrates: nutritionFact.carbohydrates,
                        fiber: nutritionFact.fiber,
                    },
                },
                recipeStep: {
                    create: recipeStep.map(item => ({
                        title: item.title,
                        order: item.order,
                        description: item.description,
                        imageUrl: item.imageUrl,
                    })),
                },

                recipeIngredients: {
                    create: recipeIngredients.map(item => ({
                        quantity: item.quantity,
                        unit: item.unit,
                        ingredient: {
                            connect: {
                                id: item.ingredientId,
                            },
                        },
                    })),
                },
            },
            include: {
                author: true,
                tag: true,
                recipeStep: true,
                recipeIngredients: {
                    include: {
                        ingredient: true,
                    },
                },
                nutritionFact: true,
            },
        });

        return recipe;
    }

    public async update(
        id: string,
        authorId: string,
        input: RecipeCreateInput,
    ): Promise<Recipe> {
        const { tag, recipeStep, recipeIngredients, nutritionFact, ...data } =
            input;

        const recipe = await this.prismaService.recipe.findFirst({
            where: {
                id,
                authorId,
            },
        });

        if (!recipe) {
            throw new NotFoundException('Такого рецепта не существует');
        }

        const updatedRecipe = await this.prismaService.recipe.update({
            where: { id },
            data: {
                ...data,

                nutritionFact: {
                    create: {
                        carbohydrates: nutritionFact.carbohydrates,
                        fats: nutritionFact.fats,
                        fiber: nutritionFact.fiber,
                        proteins: nutritionFact.proteins,
                    },
                },

                recipeIngredients: {
                    create: recipeIngredients.map(ingredient => ({
                        quantity: ingredient.quantity,
                        unit: ingredient.unit,
                        ingredientId: ingredient.ingredientId,
                    })),
                },

                recipeStep: {
                    create: recipeStep.map(step => ({
                        title: step.title,
                        order: step.order,
                        description: step.description,
                        imageUrl: step.imageUrl,
                    })),
                },

                tag: {
                    connectOrCreate: tag.map(tagName => ({
                        where: { name: tagName.name },
                        create: { name: tagName.name },
                    })),
                },
            },
            include: {
                author: true,
                tag: true,
                recipeStep: true,
                recipeIngredients: {
                    include: { ingredient: true },
                },
                nutritionFact: true,
            },
        });

        return updatedRecipe;
    }

    // For Admin
    public async delete(id: string, author: User): Promise<boolean> {
        const recipe = await this.prismaService.recipe.findFirst({
            where: {
                id,
            },
            include: {
                author: true,
            },
        });

        if (!recipe) {
            throw new NotFoundException(`Такого рецепта не существует`);
        }

        if (recipe.authorId !== author.id && author.role !== 'ADMIN') {
            throw new UnauthorizedException('Вы не можете удалить этот рецепт');
        }

        await this.prismaService.recipe.delete({
            where: { id },
        });

        return true;
    }
}
