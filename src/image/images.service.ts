import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IImage } from './interfaces/image.interface';
import { AlbumService } from 'src/album/album.service';
import { GetImageDTO } from './dto/get-image.dto';
import { UserService } from 'src/user/user.service';
import { RemoveImageDTO } from './dto/remove-image.dto';
import { AddImageDTO } from './dto/add-image.dto';
import { Result } from 'src/interfaces/result.interface';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel('Image') private readonly imageModel: Model<IImage>,
    private readonly albumService: AlbumService,
    private readonly userService: UserService,
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

  async getImage(getImageDto: GetImageDTO): Promise<IImage> {
    if (getImageDto.username) {
      const { _id } = await this.userService.findByUsername(
        getImageDto.username,
      );
      return this.imageModel
        .findOne({ imgSrc: getImageDto.imgSrc, uId: _id })
        .exec();
    } else if (getImageDto.albumname) {
      const { _id } = await this.albumService.findByName(getImageDto.albumname);
      return this.imageModel
        .findOne({ imgSrc: getImageDto.imgSrc, aId: _id })
        .exec();
    }
    throw new BadRequestException();
  }

  async removeImage(removeImageDto: RemoveImageDTO): Promise<Result> {
    if (removeImageDto.username) {
      const { _id } = await this.userService.findByUsername(
        removeImageDto.username,
      );
      return this.imageModel
        .remove({
          imgSrc: removeImageDto.imgSrc,
          uId: _id,
        })
        .exec();
    } else if (removeImageDto.albumname) {
      const { _id } = await this.albumService.findByName(
        removeImageDto.albumname,
      );
      return this.imageModel
        .remove({
          imgSrc: removeImageDto.imgSrc,
          aId: _id,
        })
        .exec();
    }
    throw new BadRequestException();
  }

  async addImage(addImageDto: AddImageDTO): Promise<IImage> {
    const user = await this.userService.findByUsername(addImageDto.username);
    const album = await this.albumService.findByName(addImageDto.albumname);
    return new this.imageModel({
      imgSrc: addImageDto.imgSrc,
      uId: user._id,
      aId: album._id,
    }).save();
  }
}
