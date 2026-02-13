import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import type { OrderCreateInput } from './inputs/order-create.input';

@Injectable()
export class OrdersService {
    public constructor(private readonly prismaService: PrismaService) {}

    public async getAllByUserId(userId: string) {
        const userOrders = await this.prismaService.order.findMany({
            where: {
                userId,
            },
            include: {
                items: {
                    include: {
                        ingredient: true,
                    },
                },
            },
        });

        if (userOrders.length === 0) {
            throw new NotFoundException('Заказы не найдены');
        }

        return userOrders;
    }

    public async create(userId: string, input: OrderCreateInput) {
        const { items } = input;

        if (!items || items.length === 0) {
            throw new BadRequestException('Нельзя создать заказ без позиций');
        }

        const ingredientIds = items.map(item => item.ingredientId);

        const ingredients = await this.prismaService.ingredient.findMany({
            where: {
                id: {
                    in: ingredientIds,
                },
            },
        });

        if (ingredients.length !== items.length) {
            throw new NotFoundException(
                'Один или несколько ингредиентов не найдены',
            );
        }

        const orderItemsData = items.map(item => {
            const ingredient = ingredients.find(
                ingredient => ingredient.id === item.ingredientId,
            );

            if (!ingredient) {
                throw new NotFoundException(
                    'Один или несколько ингредиентов не найдены',
                );
            }

            const pricePerUnit: number = ingredient.price;
            const totalPrice: number = pricePerUnit * item.quantity;

            return {
                ingredientId: ingredient.id,
                quantity: item.quantity,
                unit: item.unit,
                pricePerUnit,
                totalPrice,
            };
        });

        const totalAmount = orderItemsData.reduce(
            (sum, item) => sum + item.totalPrice,
            0,
        );

        const order = await this.prismaService.order.create({
            data: {
                userId,
                totalAmount,
                items: {
                    create: orderItemsData,
                },
            },
            include: {
                items: {
                    include: {
                        ingredient: true,
                    },
                },
            },
        });

        return order;
    }
}
