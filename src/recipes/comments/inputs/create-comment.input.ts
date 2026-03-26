import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType('CreateCommentInput')
export class CreateCommentInput {
    @IsNotEmpty({ message: 'Содержание комментария обязательно' })
    @Length(1, 500, {
        message: 'Содержание комментария должно быть от 1 до 500 символов',
    })
    @Field(() => String, { description: 'Содержание комментария' })
    content!: string;

    @IsString({ message: 'ID рецепта должен быть строкой' })
    @IsNotEmpty({ message: 'ID рецепта обязателен' })
    @Field(() => String, { description: 'ID рецепта', nullable: true })
    recipeId!: string;
}
