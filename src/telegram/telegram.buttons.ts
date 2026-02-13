import { Markup } from 'telegraf';

import type { User } from 'prisma/generated/prisma/client';

export const BUTTONS = {
    start: () =>
        Markup.inlineKeyboard([
            [
                Markup.button.callback('👤 Пользователи', 'users'),
                Markup.button.callback('📈 Статистика', 'stats'),
            ],
            [Markup.button.url('🌐 Сайт', 'https://google.com')],
        ]),

    users: (users: Pick<User, 'id' | 'fullName' | 'email'>[]) => {
        const buttons = users.map(user => [
            Markup.button.callback(user.fullName, `profile:${user.id}`),
        ]);
        return Markup.inlineKeyboard([
            ...buttons,
            [Markup.button.callback('⬅ Назад на главную', 'start')],
        ]);
    },

    profileActions: Markup.inlineKeyboard([
        [
            Markup.button.callback('⬅ Назад', 'users'),
            Markup.button.callback('🚫 Забанить', 'ban'),
        ],
    ]),
    backToUsers: Markup.inlineKeyboard([
        [Markup.button.callback('⬅ Назад к пользователям', 'users')],
    ]),

    backToMenu: Markup.inlineKeyboard([
        [Markup.button.callback('⬅ Назад в меню', 'start')],
    ]),
};
