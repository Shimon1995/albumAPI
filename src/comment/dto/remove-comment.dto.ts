import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveCommentDTO {
  @ApiProperty()
  @IsString()
  commentId: string;

  @ApiProperty()
  @IsString()
  content: string;
}
