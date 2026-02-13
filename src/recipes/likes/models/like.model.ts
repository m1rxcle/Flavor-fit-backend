import { Field, ID, ObjectType } from '@nestjs/graphql';
@ObjectType({ description: 'Модель лайка' })
export class LikeModel {
    @Field(() => ID, { description: 'ID лайка' })
    id!: number;
    @Field(() => String, { description: 'ID рецепта' })
    recipeId!: string;
    @Field(() => String, { description: 'ID пользователя' })
    userId!: string;
    @Field(() => Date, { description: 'Дата создания лайка' })
    createdAt!: Date;
    @Field(() => Date, { description: 'Дата обновления лайка' })
    updatedAt!: Date;
}
