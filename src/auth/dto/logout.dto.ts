import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LogOutDTO {
  @ApiProperty()
  @IsEmail()
  readonly userEmail: string;

  @ApiProperty()
  @IsString()
  readonly token: string;
}
