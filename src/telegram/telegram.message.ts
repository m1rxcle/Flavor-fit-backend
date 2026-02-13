import type { Profile, User } from 'prisma/generated/prisma/client';

import type { UserMetadata } from 'src/common/interfaces';

export const MESSAGES = {
    welcome:
        `🩷 <b>Добро пожаловать в Flavor Fit security Bot!</b> 🩷\n\n` +
        `Данный бот предназначен для админов приложения FlavorFit!\n` +
        `Он поможет вам отслеживать состояние вашего приложения и данных, таких как:\n` +
        `--<b>Рецепты</b>\n` +
        `--<b>Ингредиенты</b>\n` +
        `--<b>Пользователи</b>\n` +
        `--<b>Заказы</b>\n` +
        `Удачи в использовании нашего бота!`,

    usersTitle: `<b>👥 Пользователи</b>\n\nЭто все пользователи вашего приложения:`,

    profile: (profile: Profile) =>
        `<b>👤 Профиль пользователя</b>\n\n` +
        `Имя: <b>${profile.fullName}</b>\n` +
        `Пол: <b>${profile.gender}</b>\n` +
        `Возраст: <b>${profile.age ?? '-'}</b>\n` +
        `Био: <b>${profile.bio ?? '—'}</b>`,
    stats: (
        users: number,
        recipes: number,
        ingredients: number,
        orders: number,
    ) =>
        `<b>📈 Статистика вашего приложения FlavorFit!</b>\n\n` +
        `👤 Пользователи: <b>${users}</b>\n` +
        `🍽 Рецепты: <b>${recipes}</b>\n` +
        `🥕 Ингредиенты: <b>${ingredients}</b>\n` +
        `📦 Заказы: <b>${orders}</b>\n`,

    newUserIncome: ({ ip, device, location }: UserMetadata, user: User) =>
        `🆕 У вас новый пользователь! 🆕\n\n` +
        `💀 Имя пользователя: <b>${user.fullName}</b>\n` +
        `📨 Почта пользователя: <b>${user.email}</b>\n` +
        `🕵️‍♀️ Роль пользователя: <b>${user.role}</b>\n\n` +
        `📍 IP: <b>${ip}</b>\n` +
        `💻 Тип устройства: <b>${device.type}</b>\n` +
        `🤖 ОС: <b>${device.os}</b>\n` +
        `👀 Браузер: <b>${device.browser}</b>\n` +
        `🌍 Страна/Город: <b>${location.country}</b>, <b>${location.city}</b>\n\n` +
        `📏 Широта: <b>${location.latitude?.toFixed(1)}</b>\n` +
        `📏 Долгота: <b>${location.longitude?.toFixed(1)}</b>`,
};
