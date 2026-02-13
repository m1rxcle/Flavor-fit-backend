import { registerEnumType } from '@nestjs/graphql';

import { OrderStatus } from 'prisma/generated/prisma/enums';

registerEnumType(OrderStatus, {
    name: 'OrderStatus',
    description: 'Статус заказа',
    valuesMap: {
        PENDING: { description: 'В ожидании' },
        PROCESSING: { description: 'В обработке' },
        COMPLETED: { description: 'Выполнен' },
        CANCELED: { description: 'Отменен' },
    },
});

export { OrderStatus };
