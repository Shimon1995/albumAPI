import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveCommentDTO {
  @ApiProperty()
  @IsString()
  content: string;
}
