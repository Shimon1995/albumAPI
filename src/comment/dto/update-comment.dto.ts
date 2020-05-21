import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateCommentDTO {
  @ApiProperty()
  @IsString()
  newContent: string;
}
