import { ApiPropertyOptional } from '@nestjs/swagger';
import { RolesEnum } from '../enums/roles.enum';
import { IsOptional } from 'class-validator';
import { CreateAddressDTO } from './create-address.dto';
import { GenderEnum } from '../enums/gender.enum';

export class ModifyUserDTO {
  username: string;
  options: {
    username: string;
    roles: Array<RolesEnum>;
    firstName: string;
    lastName: string;
    address: CreateAddressDTO;
    gender: GenderEnum;
  };
}
