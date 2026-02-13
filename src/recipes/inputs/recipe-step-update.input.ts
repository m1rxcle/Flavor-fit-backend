import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class RecipeStepUpdateInput {
    @IsNumber({}, { message: 'Порядковый номер шага должен быть числом' })
    @IsOptional({ message: 'Порядковый номер шага не обязателен' })
    @Field(() => Int, { description: 'Порядковый номер шага', nullable: true })
    order?: number;
    @IsString({ message: 'Описание шага должно быть строкой' })
    @IsOptional({ message: 'Описание шага не обязателен' })
    @Field(() => String, { description: 'Описание шага', nullable: true })
    description?: string;
    @IsString({ message: 'Название шага должно быть строкой' })
    @IsOptional({ message: 'Название шага не обязателен' })
    @Field(() => String, { description: 'Название шага', nullable: true })
    title?: string;
    @Field(() => String, {
        description: 'Ссылка на картинку шага',
        nullable: true,
    })
    @IsString({ message: 'Ссылка на картинку шага должна быть строкой' })
    @IsOptional({ message: 'Ссылка на картинку шага не обязательна' })
    imageUrl?: string;
}
