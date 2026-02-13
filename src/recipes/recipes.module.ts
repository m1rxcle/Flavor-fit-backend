import { Module } from '@nestjs/common';

import { CommentsModule } from './comments/comments.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { LikesModule } from './likes/likes.module';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';

@Module({
    providers: [RecipesResolver, RecipesService],
    imports: [IngredientsModule, LikesModule, CommentsModule],
})
export class RecipesModule {}
