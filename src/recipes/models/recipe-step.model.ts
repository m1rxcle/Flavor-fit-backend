import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RecipeStepModel {
    @Field(() => String, { description: 'ID шага' })
    id!: string;
    @Field(() => String, { description: 'Название шага' })
    title!: string;
    @Field(() => String, {
        description: 'Ссылка на картинку шага',
        nullable: true,
    })
    imageUrl: string | null = null;
    @Field(() => String, { description: 'Описание шага' })
    description!: string;
    @Field(() => Int, { description: 'Порядковый номер шага' })
    order!: number;
    @Field(() => String, { description: 'ID рецепта' })
    recipeId!: string;
    @Field(() => Date, { description: 'Дата создания шага' })
    createdAt!: Date;
    @Field(() => Date, { description: 'Дата обновления шага' })
    updatedAt!: Date;
}
