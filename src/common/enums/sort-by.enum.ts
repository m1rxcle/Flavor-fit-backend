import { registerEnumType } from '@nestjs/graphql';

export enum SortByEnum {
    DEFAULT = 'default',
    RECOMMENDED = 'recommended',
    POPULARITY = 'popularity',
}

registerEnumType(SortByEnum, {
    name: 'SortByEnum',
    description: 'Сортировка рецептов',
    valuesMap: {
        DEFAULT: { description: 'По умолчанию' },
        RECOMMENDED: { description: 'По рекомендациям' },
        POPULARITY: { description: 'По популярности' },
    },
});
