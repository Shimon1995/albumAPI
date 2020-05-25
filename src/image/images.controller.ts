import {
  Controller,
  Get,
  Query,
  ValidationPipe,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { IImage } from './interfaces/image.interface';
import { ImagesService } from './images.service';
import { GetImageDTO } from './dto/get-image.dto';
import { AddImageDTO } from './dto/add-image.dto';
import { RemoveImageDTO } from './dto/remove-image.dto';
import { Result } from 'src/interfaces/result.interface';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';

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

  @Get('getImage')
  getSingleImage(
    @Query(ValidationPipe) getImageDto: GetImageDTO,
  ): Promise<IImage> {
    return this.imageService.getImage(getImageDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Post('addImage')
  addSingleImage(
    @Query(ValidationPipe) addImageDto: AddImageDTO,
  ): Promise<IImage> {
    return this.imageService.addImage(addImageDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Delete('deleteImage')
  deleteImage(
    @Query(ValidationPipe) removeImageDto: RemoveImageDTO,
  ): Promise<Result> {
    return this.imageService.removeImage(removeImageDto);
  }
}
