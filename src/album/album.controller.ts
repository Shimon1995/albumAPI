import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateAlbumDTO } from './dto/create-album.dto';
import { AlbumService } from './album.service';
import { IAlbum } from './interfaces/album.interface';
import { FindAlbumsDTO } from './dto/find-albums.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('album')
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('createAlbum')
  createAlbum(
    @Body(ValidationPipe) createAlbumDto: CreateAlbumDTO,
  ): Promise<IAlbum> {
    return this.albumService.createAlbum(createAlbumDto);
  }

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @Get('getAlbums')
  getAlbumList(): Promise<IAlbum[]> {
    return this.albumService.getAlbumList();
  }

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @Get('getUserAlbums')
  getUserAlbums(
    @Query(ValidationPipe) findAlbum: FindAlbumsDTO,
  ): Promise<IAlbum[]> {
    return this.albumService.getUserAlbumList(findAlbum.username);
  }
}
