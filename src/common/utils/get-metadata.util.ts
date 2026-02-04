import DeviceDetector = require('device-detector-js');
import { lookup } from 'geoip-lite';
import * as countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

import type { UserMetadata } from '../interfaces';
import type { Request } from 'express';

countries.registerLocale(enLocale);

export const getMetadata = (req: Request, userAgent: string): UserMetadata => {
    const ip =
        process.env.MODE === 'development'
            ? '173.166.164.121'
            : Array.isArray(req.headers['cf-connecting-ip'])
              ? req.headers['cf-connecting-ip'][0]
              : req.headers['cf-connecting-ip'] ||
                (typeof req.headers['x-forwarded-for'] === 'string'
                    ? req.headers['x-forwarded-for'].split(',')[0]
                    : req.ip);

    const location = ip ? lookup(ip) : null;

    const device = new DeviceDetector().parse(userAgent);

    return {
        location: {
            country:
                countries.getName(location?.country ?? '', 'en') ||
                'Неизвестно',
            city: location?.city ?? null,
            latitude: location?.ll[0] ?? 0,
            longitude: location?.ll[1] ?? 0,
        },
        device: {
            browser: device.client?.name ?? null,
            os: device.os?.name ?? null,
            type: device.device?.type ?? null,
        },
        ip: ip ?? '0.0.0.0',
    };
};
