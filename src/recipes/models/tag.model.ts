import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RecipeTagModel {
    @Field(() => String, { description: 'ID тега' })
    id!: string;
    @Field(() => String, { description: 'Название тега' })
    name!: string;
    @Field(() => Date, { description: 'Дата создания тега' })
    createdAt!: Date;
    @Field(() => Date, { description: 'Дата обновления тега' })
    updatedAt!: Date;
}
