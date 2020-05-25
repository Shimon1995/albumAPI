import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetImageDTO {
  @IsString()
  @ApiProperty()
  imgSrc: string;
  @IsString()
  @ApiProperty()
  @IsOptional()
  albumname?: string;
  @IsString()
  @ApiProperty()
  @IsOptional()
  username?: string;
}
