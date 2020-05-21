import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindAlbumsDTO {
  @ApiProperty()
  @IsString()
  username: string;
}
