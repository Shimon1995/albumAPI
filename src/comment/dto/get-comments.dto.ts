import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetCommentsDTO {
  @ApiProperty()
  @IsString()
  imageId: string;
}
