import { registerEnumType } from '@nestjs/graphql';

import { Unit } from 'prisma/generated/prisma/enums';

registerEnumType(Unit, {
    name: 'Unit',
    description: 'Единица измерения',
    valuesMap: {
        CLOVES: { description: 'Зубчик' },
        GRAM: { description: 'Грамм' },
        PIECE: { description: 'Кусок' },
        CUP: { description: 'Чашка' },
        MILLILITER: { description: 'Миллилитр' },
        TABLESPOON: { description: 'Столовая ложка' },
        TEASPOON: { description: 'Чайная ложка' },
    },
});

export { Unit };
