import { Injectable, type OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    Action,
    Command,
    Ctx,
    InjectBot,
    Start,
    Update,
} from 'nestjs-telegraf';
import { Telegraf, type Context } from 'telegraf';

import type { User } from 'prisma/generated/prisma/client';

import type { UserMetadata } from 'src/common/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';

import { BUTTONS } from './telegram.buttons';
import { MESSAGES } from './telegram.message';

@Update()
@Injectable()
export class TelegramService extends Telegraf implements OnModuleInit {
    private readonly _token: string;

    public constructor(
        private readonly prismaService: PrismaService,
        private readonly configService: ConfigService,
        @InjectBot() private readonly bot: Telegraf,
    ) {
        super(configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN'));
        this._token = configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN');
    }

    async onModuleInit() {
        await this.bot.telegram.setMyCommands([
            { command: 'start', description: 'Запустить бота и войти в меню' },
            { command: 'stats', description: 'Показать статистику бота' },
            { command: 'users', description: 'Показать всех пользователей' },
        ]);
    }

    @Start()
    async onStart(@Ctx() ctx: Context) {
        const chatId = ctx.chat?.id.toString();

        const admin = await this.prismaService.user.findFirst({
            where: {
                role: 'ADMIN',
                telegramId: null,
            },
        });

        if (admin) {
            await this.prismaService.user.update({
                where: { id: admin.id },
                data: { telegramId: chatId },
            });

            await ctx.replyWithHTML(MESSAGES.welcome, BUTTONS.start());
        }

        const existingAdmin = await this.prismaService.user.findFirst({
            where: {
                role: 'ADMIN',
                telegramId: chatId,
            },
        });

        if (existingAdmin) {
            await ctx.replyWithHTML(MESSAGES.welcome, BUTTONS.start());
        } else {
            // Любой другой пользователь — нет прав
            await ctx.replyWithHTML(
                'Вы не имеете прав доступа к этому боту 😅',
            );
        }
    }

    @Command('users')
    async usersCommand(@Ctx() ctx: Context) {
        await this.showUsers(ctx);
    }

    @Command('stats')
    async statsCommand(@Ctx() ctx: Context) {
        await this.showStats(ctx);
    }

    @Action('start')
    async backToMenuAction(@Ctx() ctx: Context) {
        await this.backToStart(ctx);
    }

    // 👤 Пользователи
    @Action('users')
    async userAction(@Ctx() ctx: Context) {
        await this.showUsers(ctx);
    }

    @Action('stats')
    async statsAction(@Ctx() ctx: Context) {
        await this.showStats(ctx);
    }

    @Action(/profile:(.*)/)
    async showProfile(@Ctx() ctx: Context) {
        await ctx.answerCbQuery();

        const callbackQuery = ctx.callbackQuery;
        if (!callbackQuery || !('data' in callbackQuery) || !callbackQuery.data)
            return;

        const data = callbackQuery.data;

        const userId = data.split(':')[1];

        const profile = await this.prismaService.profile.findUnique({
            where: { userId },
        });

        if (!profile) {
            await ctx.editMessageText('У этого пользователя нет профиля');
            return;
        }

        await ctx.editMessageText(MESSAGES.profile(profile), {
            parse_mode: 'HTML',
            ...BUTTONS.backToMenu,
        });
    }

    private async showUsers(@Ctx() ctx: Context) {
        const users = await this.prismaService.user.findMany({
            select: {
                id: true,
                fullName: true,
                email: true,
            },
            take: 20,
            orderBy: { createdAt: 'desc' },
        });

        if (!users.length) {
            await ctx.reply('Пользователей нет');
            return;
        }

        await ctx.reply(MESSAGES.usersTitle, {
            parse_mode: 'HTML',
            ...BUTTONS.users(users),
        });
    }

    private async showStats(@Ctx() ctx: Context) {
        const [users, recipes, ingredients, orders] = await Promise.all([
            this.prismaService.user.count(),
            this.prismaService.recipe.count(),
            this.prismaService.ingredient.count(),
            this.prismaService.order.count(),
        ]);

        await ctx.reply(MESSAGES.stats(users, recipes, ingredients, orders), {
            parse_mode: 'HTML',
            ...BUTTONS.backToMenu,
        });
    }

    async newUser(metadata: UserMetadata, user: User) {
        const admin = await this.prismaService.user.findFirst({
            where: {
                role: 'ADMIN',
                telegramId: { not: null },
            },
        });

        if (!admin || !admin.telegramId) return;

        await this.bot.telegram.sendMessage(
            Number(admin.telegramId),
            MESSAGES.newUserIncome(metadata, user),
            { parse_mode: 'HTML' },
        );
    }

    private async backToStart(@Ctx() ctx: Context) {
        await ctx.editMessageText(MESSAGES.welcome, {
            parse_mode: 'HTML',
            ...BUTTONS.start(),
        });
    }
}
