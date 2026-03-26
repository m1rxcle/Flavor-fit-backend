import { UseGuards } from '@nestjs/common';

import { CaptchaGuard } from '../guards';

export const Captcha = () => UseGuards(CaptchaGuard);
