import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Результат лайка' })
export class LikeResponse {
    @Field(() => Boolean, { description: 'Лайкнут ли рецепт' })
    isLiked!: boolean;
}
