import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { ConfigService } from '@nestjs/config';
import { configureCloudinary } from './config';

// @Module({
//   controllers: [CloudinaryController],
//   providers: [CloudinaryService]
// })
// export class CloudinaryModule {}

@Module({
  providers: [
    CloudinaryService,
    {
      provide: 'CLOUDINARY_CONFIG',
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService,
      ) => configureCloudinary(configService),
    },
  ],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
