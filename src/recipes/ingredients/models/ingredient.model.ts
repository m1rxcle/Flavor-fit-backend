import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IngredientModel {
    @Field(() => ID, { description: 'ID ингредиента' })
    id!: string;
    @Field(() => String, { description: 'Название ингредиента' })
    title!: string;
    @Field(() => String, { description: 'Описание ингредиента' })
    description!: string;
    @Field(() => Float, { description: 'Цена ингредиента' })
    price!: number;
    @Field(() => String, { description: 'Ссылка на картинку ингредиента' })
    iconUrl!: string;
    @Field(() => Date, { description: 'Дата создания ингредиента' })
    createdAt!: Date;
    @Field(() => Date, { description: 'Дата обновления ингредиента' })
    updatedAt!: Date;
}
