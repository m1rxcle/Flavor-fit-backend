import { Field, ID, ObjectType } from '@nestjs/graphql';

import { UserProfileModel } from 'src/users/models';

@ObjectType({ description: 'Комментарии к рецепту' })
export class CommentsModel {
    @Field(() => ID, { description: 'ID комментария' })
    id!: string;
    @Field(() => String, { description: 'ID автора комментария' })
    authorId!: string;
    @Field(() => UserProfileModel, {
        description: 'Автор комментария',
    })
    author!: UserProfileModel;
    @Field(() => String, { description: 'ID рецепта' })
    recipeId!: string;
    @Field(() => String, { description: 'Содержание комментария' })
    content!: string;
    @Field(() => Date, { description: 'Дата создания комментария' })
    createdAt!: Date;
    @Field(() => Date, { description: 'Дата обновления комментария' })
    updatedAt!: Date;
}
