import { registerEnumType } from '@nestjs/graphql';

import { Difficulty } from 'prisma/generated/prisma/enums';

registerEnumType(Difficulty, {
    name: 'Difficulty',
    description: 'Сложность рецепта',
    valuesMap: {
        EASY: { description: 'Легкий' },
        MEDIUM: { description: 'Средний' },
        HARD: { description: 'Сложный' },
    },
});

export { Difficulty };
