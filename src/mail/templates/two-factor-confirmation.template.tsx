import {
    Body,
    Container,
    Heading,
    Hr,
    Preview,
    Section,
    Tailwind,
    Text,
} from '@react-email/components';
import { Html } from '@react-email/html';
import * as React from 'react';

import type { UserMetadata } from 'src/common/interfaces';

interface TwoFactorConfirmationTemplateProps {
    token: string;
    userMetadata: UserMetadata;
}

export const TwoFactorConfirmationTemplate = ({
    token,
    userMetadata,
}: TwoFactorConfirmationTemplateProps) => {
    const splitToken = token;
    const { device, ip, location } = userMetadata;

    return (
        <Tailwind>
            <Html className="bg-gray-500">
                <Body className="bg-white font-aws text-[#212121]">
                    <Preview>
                        Flavor Fit - Система двухфакторного аутентификации{' '}
                    </Preview>
                    <Container className="p-5 mx-auto bg-[#eee]">
                        <Section className="bg-white">
                            <Section className="bg-[#252f3d] flex py-5 items-center justify-center text-center mx-auto px-[35px]">
                                <Text className="text-white font-semibold text-[36px] ">
                                    Flavor Fit
                                </Text>
                            </Section>
                            <Section className="py-[25px] px-[35px]">
                                <Heading className="text-[#333] text-[20px] font-bold mb-[15px]">
                                    Сообщение от системы безопасности
                                </Heading>
                                <Text className="text-[#333] text-[14px] leading-[24px] mt-6 mb-[14px] mx-0">
                                    Здравствуйте! Для повышения безопасности
                                    вашей учетной записи мы отправили вам код
                                    двухфакторной аутентификации. Пожалуйста не
                                    сообщайте его никого.
                                </Text>
                                <Section className="flex items-center justify-center">
                                    <Text className="text-[#333] m-0 font-bold text-center text-[14px]">
                                        Код подтверждения
                                    </Text>

                                    <Text className="text-[#333] text-[36px] my-[10px] mx-0 font-bold text-center">
                                        {splitToken}
                                    </Text>
                                    <Text className="text-[#333] text-[14px] m-0 text-center">
                                        (Код действителен в течение 10 минут)
                                    </Text>
                                </Section>
                            </Section>
                            <Hr />
                            <Section className="py-[25px] px-[35px]">
                                <Heading className="text-[#333] text-[20px] font-bold mb-[15px]">
                                    Запрос был отправлен с:
                                </Heading>
                                <ul className="text-black bg-gray-100 rounded-2xl p-3 list-none ">
                                    <li>
                                        📍 IP:{' '}
                                        <span className="font-semibold text-md">
                                            {ip}
                                        </span>
                                    </li>
                                    <li>
                                        💻 Тип устройства:{' '}
                                        <span className="font-semibold text-md">
                                            {device.type}
                                        </span>
                                    </li>
                                    <li>
                                        🤖 Устройство:{' '}
                                        <span className="font-semibold text-md">
                                            {device.os}
                                        </span>
                                    </li>
                                    <li>
                                        👀 Браузер:{' '}
                                        <span className="font-semibold text-md">
                                            {device.browser}
                                        </span>
                                    </li>
                                    <li>
                                        🌍 Страна:{' '}
                                        <span className="font-semibold text-md">
                                            {location.country}
                                        </span>
                                        , Город:{' '}
                                        <span className="font-semibold text-md">
                                            {location.city}
                                        </span>
                                    </li>
                                    <li>
                                        📏 Широта:{' '}
                                        <span className="font-semibold text-md">
                                            {location.latitude?.toFixed(1)}
                                        </span>
                                    </li>
                                    <li>
                                        📏 Долгота:{' '}
                                        <span className="font-semibold text-md">
                                            {location.longitude?.toFixed(1)}
                                        </span>
                                    </li>
                                </ul>
                            </Section>
                            <Section className="py-[25px] px-[35px]">
                                <Text className="text-[#333] text-[14px] m-0">
                                    Flavor fit никогда не будет отправлять спам
                                    по электронной почте, просить вас
                                    подтвердить свой пароль, кредитную карту или
                                    другую информацию.
                                </Text>
                            </Section>
                        </Section>
                        <Text className="text-[#333] text-[12px] my-[24px] mx-0 px-5 py-0">
                            Это сообщение было отправлено от Flavor Fit. Все
                            права и лицензии защищены. Не отвечайте на это
                            письмо.
                        </Text>
                    </Container>
                </Body>
            </Html>
        </Tailwind>
    );
};
