import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Authorization, Authorized } from 'src/auth/decorators';

import { OrderCreateInput } from './inputs/order-create.input';
import { OrderModel } from './models/order.model';
import { OrdersService } from './orders.service';

@Authorization()
@Resolver()
export class OrdersResolver {
    constructor(private readonly ordersService: OrdersService) {}

    @Query(() => [OrderModel])
    public getAllOrdersFromId(@Authorized('id') userId: string) {
        return this.ordersService.getAllByUserId(userId);
    }

    @Mutation(() => OrderModel)
    public createOrder(
        @Authorized('id') userId: string,
        @Args('input', { type: () => OrderCreateInput })
        input: OrderCreateInput,
    ) {
        return this.ordersService.create(userId, input);
    }
}
