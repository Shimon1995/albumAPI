import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { AlbumModule } from 'src/album/album.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from './schemas/image.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    AlbumModule,
    UserModule,
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]),
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
