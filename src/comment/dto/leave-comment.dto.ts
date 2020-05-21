import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LeaveCommentDTO {
    @ApiProperty()
    @IsString()
    imageId: string;
    @IsString()
    @ApiProperty()
    content: string;
}