import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, IsOptional } from 'class-validator';

export class CreateAlbumDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @Matches(/(https?: \/\/)?(www.)?\w+\.(com|org|ua|now.sh|ru|su)/, {
    message: 'Is Supposed to be a valid link',
  })
  link: string;
}
