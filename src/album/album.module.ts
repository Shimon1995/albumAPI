import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AlbumSchema } from './schemas/album.schema';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { UserModule } from 'src/user/user.module';
import { ImageSchema } from './schemas/image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Album', schema: AlbumSchema },
      { name: 'Image', schema: ImageSchema },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot(),
    UserModule,
  ],
  providers: [AlbumService],
  exports: [AlbumService],
  controllers: [AlbumController],
})
export class AlbumModule {}
