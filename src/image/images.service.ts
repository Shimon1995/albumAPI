import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IImage } from './interfaces/image.interface';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel('Image') private readonly imageModel: Model<IImage>,
    private readonly albumService: AlbumService,
  ) {}

  getAllImages(): Promise<IImage[]> {
    return this.imageModel.find({}).exec();
  }

  async getImagesByAlbum(albumname: string): Promise<IImage[]> {
    const album = await this.albumService.findByName(albumname);
    if (album) {
      return this.imageModel.find({ aId: album._id }).exec();
    }
    throw new BadRequestException('No such album');
  }
}
