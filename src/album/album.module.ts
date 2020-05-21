import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumSchema } from './schemas/album.schema';
import { AlbumController } from './album.controller';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Album', schema: AlbumSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot(),
    UserModule,
  ],
  providers: [AlbumService],
  exports: [AlbumService],
  controllers: [AlbumController],
})
export class AlbumModule {}
