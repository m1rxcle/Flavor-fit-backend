import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { OrderItemInput } from './order-item.input';

@InputType()
export class OrderCreateInput {
    @IsNotEmpty({ message: 'Позиции заказа обязательны' })
    @Field(() => [OrderItemInput], {
        description: 'Позиции заказа',
    })
    items!: OrderItemInput[];
}
