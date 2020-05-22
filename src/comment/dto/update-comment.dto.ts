import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateCommentDTO {
  @ApiProperty()
  @IsString()
  commentId: string;

  @ApiProperty()
  @IsString()
  newContent: string;

  @ApiProperty()
  @IsString()
  oldContent: string;
}
