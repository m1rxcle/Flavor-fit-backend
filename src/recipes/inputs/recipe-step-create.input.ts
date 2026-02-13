import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class RecipeStepCreateInput {
    @IsNumber({}, { message: 'Порядковый номер шага должен быть числом' })
    @IsNotEmpty({ message: 'Порядковый номер шага обязателен' })
    @Field(() => Int, { description: 'Порядковый номер шага' })
    order!: number;
    @IsString({ message: 'Описание шага должно быть строкой' })
    @IsNotEmpty({ message: 'Описание шага обязателен' })
    @Field(() => String, { description: 'Описание шага' })
    description!: string;
    @IsString({ message: 'Название шага должно быть строкой' })
    @IsNotEmpty({ message: 'Название шага обязателен' })
    @Field(() => String, { description: 'Название шага' })
    title!: string;
    @Field(() => String, { description: 'Ссылка на картинку шага' })
    @IsString({ message: 'Ссылка на картинку шага должна быть строкой' })
    @IsOptional({ message: 'Ссылка на картинку шага не обязательна' })
    imageUrl?: string | undefined;
}
