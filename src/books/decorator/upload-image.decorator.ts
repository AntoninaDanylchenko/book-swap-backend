import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const UploadImage = createParamDecorator(
  async (
    _data: unknown,
    ctx: ExecutionContext,
  ) => {
    const request = ctx
      .switchToHttp()
      .getRequest();
    const file = request.file;

    if (!file) {
      return null;
    }

    const formData = new FormData();
    formData.append('file', file.buffer);
    formData.append(
      'upload_preset',
      process.env.CLOUDINARY_UPLOAD_PRESET,
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      },
    );

    const data = await response.json();
    return data.secure_url;
  },
);
