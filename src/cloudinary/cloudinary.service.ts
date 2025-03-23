import { Injectable } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiResponse,
} from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: 'books' },
          (error, result: UploadApiResponse) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          },
        )
        .end(file.buffer);
    });
  }
}
