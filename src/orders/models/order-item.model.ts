import { Field, Float, ObjectType } from '@nestjs/graphql';

import { IngredientModel } from 'src/recipes/ingredients/models';

import { Unit } from '../enums';
@ObjectType()
export class OrderItemModel {
    @Field(() => String, { description: 'ID заказа' })
    id!: string;
    @Field(() => IngredientModel, { description: 'Конкретный ингредиент' })
    ingredient!: IngredientModel;
    @Field(() => Float, { description: 'Количество' })
    quantity!: number;
    @Field(() => Unit, { description: 'Единица измерения' })
    unit!: Unit;
    @Field(() => Float, { description: 'Цена за единицу' })
    pricePerUnit!: number;
    @Field(() => Float, { description: 'Общая цена' })
    totalPrice!: number;

    @Field(() => Date, { description: 'Дата создания заказа' })
    createdAt!: Date;
    @Field(() => Date, { description: 'Дата обновления заказа' })
    updatedAt!: Date;
}
