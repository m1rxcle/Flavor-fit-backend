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

export const TwoFactorReminderTemplate = () => {
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
                                    вашей учетной записи рекомендуем включить
                                    двухфакторную аутентификацию. Сейчас она не
                                    активирована, и ваша учетная запись может
                                    быть более уязвима.
                                </Text>
                            </Section>
                            <Hr />
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
