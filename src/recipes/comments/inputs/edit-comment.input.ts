import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

@InputType('EditCommentInput')
export class EditCommentInput {
    @IsNotEmpty({ message: 'Содержание комментария обязательно' })
    @Length(1, 500, {
        message: 'Содержание комментария должно быть от 1 до 500 символов',
    })
    @Field(() => String, { description: 'Содержание комментария' })
    content!: string;
}
