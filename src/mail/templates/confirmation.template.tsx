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

interface ConfirmationTemplateProps {
    token: string;
}

export const ConfirmationTemplate = ({ token }: ConfirmationTemplateProps) => {
    const splitToken = token;

    return (
        <Tailwind>
            <Html className="bg-gray-500">
                <Body className="bg-white font-aws text-[#212121]">
                    <Preview>
                        Flavor Fit - Подтверждение почты ({splitToken})
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
                                    Подтвердите свою почту
                                </Heading>
                                <Text className="text-[#333] text-[14px] leading-[24px] mt-6 mb-[14px] mx-0">
                                    Спасибо за регистрацию в Flavor Fit!
                                    Пожалуйста, подтвердите свою почту. Мы хотим
                                    быть уверены, что вы владелец этого адреса
                                    электронной почты. Пожалуйста, введите код
                                    подтверждения ниже. Если вы не хотите
                                    создавать аккаунт Flavor Fit, просто
                                    проигнорируйте это письмо.
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
                            права защищены. Не отвечайте на это письмо.
                        </Text>
                    </Container>
                </Body>
            </Html>
        </Tailwind>
    );
};
