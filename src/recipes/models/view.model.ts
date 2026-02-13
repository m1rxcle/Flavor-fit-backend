import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ViewModel {
    @Field(() => String, { description: 'ID просмотра' })
    id!: string;
    @Field(() => String, { description: 'ID рецепта' })
    recipeId!: string;
    @Field(() => String, { description: 'ID пользователя' })
    userId!: string;
    @Field(() => Date, { description: 'Дата создания просмотра' })
    createdAt!: Date;
    @Field(() => Date, { description: 'Дата обновления просмотра' })
    updatedAt!: Date;
}
