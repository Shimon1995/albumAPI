import { Controller, Get, Query } from '@nestjs/common';
import { IImage } from './interfaces/image.interface';
import { ImagesService } from './images.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imageService: ImagesService) {}

  @Get('getImages')
  getAllImages(): Promise<IImage[]> {
    return this.imageService.getAllImages();
  }

  @Get('getAlbumImages')
  getAlbumImages(@Query('albumname') albumname: string): Promise<IImage[]> {
    return this.imageService.getImagesByAlbum(albumname);
  }
}
