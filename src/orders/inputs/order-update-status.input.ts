import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty } from 'class-validator';

import { OrderStatus } from '../enums';

@InputType('OrderUpdateStatusInput')
export class OrderUpdateStatusInput {
    @IsEnum(OrderStatus)
    @IsNotEmpty({ message: 'Статус заказа обязателен' })
    @Field(() => OrderStatus, { description: 'Статус заказа' })
    status!: OrderStatus;
}
