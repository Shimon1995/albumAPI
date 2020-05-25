import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  Matches,
  IsEnum,
} from 'class-validator';
import { GenderEnum } from '../enums/gender.enum';
import { CreateAddressDTO } from './create-address.dto';

export class CreateUserDTO {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    { message: 'Weak password' },
  )
  readonly password: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly address: CreateAddressDTO;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(GenderEnum)
  readonly gender: GenderEnum;
}
