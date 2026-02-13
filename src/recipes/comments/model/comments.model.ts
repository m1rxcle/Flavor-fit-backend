import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Комментарии к рецепту' })
export class CommentsModel {
    @Field(() => ID, { description: 'ID комментария' })
    id!: string;
    @Field(() => String, { description: 'ID автора комментария' })
    authorId!: string;
    @Field(() => String, { description: 'ID рецепта' })
    recipeId!: string;
    @Field(() => String, { description: 'Содержание комментария' })
    content!: string;
    @Field(() => Date, { description: 'Дата создания комментария' })
    createdAt!: Date;
    @Field(() => Date, { description: 'Дата обновления комментария' })
    updatedAt!: Date;
}
