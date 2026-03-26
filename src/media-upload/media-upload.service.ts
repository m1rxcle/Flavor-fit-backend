import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as iconv from 'iconv-lite';
import { v4 as uuidv4 } from 'uuid';

import type { IUploadAvatar } from './interfaces';
import type { Multer } from 'multer';

@Injectable()
export class MediaUploadService {
    constructor() {}

    public async uploadAvatar(
        file: Express.Multer.File,
    ): Promise<IUploadAvatar> {
        const folder = 'avatars';
        const uploadFolder = `${path}/tmp/${folder}`;

        await ensureDir(uploadFolder);

        const original = iconv.decode(
            Buffer.from(file.originalname, 'binary'),
            'utf-8',
        );
        const safeName = original.replace(/[^\w.-]+/g, '-').toLowerCase();
        const name = `${uuidv4().slice(0, 5)}-${safeName}`;

        await writeFile(`${uploadFolder}/${name}`, file.buffer);

        const url = `/tmp/${folder}/${name}`;

        return {
            url,
            name,
        };
    }
}
