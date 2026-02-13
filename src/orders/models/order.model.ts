import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

import { OrderStatus } from '../enums';

import { OrderItemModel } from './order-item.model';
@ObjectType('Order')
export class OrderModel {
    @Field(() => String, { description: 'ID заказа' })
    id!: string;
    @Field(() => Int, { description: 'ID Заказа' })
    orderId!: number;
    @Field(() => OrderStatus, { description: 'Статус заказа' })
    status!: OrderStatus;
    @Field(() => [OrderItemModel], {
        description: 'Позиции заказа',
        nullable: true,
    })
    items?: OrderItemModel[];
    @Field(() => Float, { description: 'Итоговая сумма заказа' })
    totalAmount!: number;

    @Field(() => Date, { description: 'Дата создания заказа' })
    createdAt!: Date;
    @Field(() => Date, { description: 'Дата обновления заказа' })
    updatedAt!: Date;
}
