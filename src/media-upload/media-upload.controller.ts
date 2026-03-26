import {
    Controller,
    HttpCode,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { MediaUploadService } from './media-upload.service';

@Controller('media-upload')
export class MediaUploadController {
    constructor(private readonly mediaUploadService: MediaUploadService) {}

    @HttpCode(200)
    @Post('avatar')
    @UseInterceptors(
        FileInterceptor('file', { limits: { fileSize: 5 * 1024 * 1024 } }),
    )
    public uploadAvatar(@UploadedFile() file: Express.Multer.File) {
        return this.mediaUploadService.uploadAvatar(file);
    }
}
