import { GenderEnum } from '../enums/gender.enum';
import { StatusEnum } from '../enums/status.enum';
import { IAddress } from './address.interface';
import { Document } from 'mongoose';
import { RolesEnum } from '../enums/roles.enum';

export interface IUser extends Document {
  readonly email: string;
  readonly username: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly password: string;
  readonly address: IAddress;
  readonly gender: GenderEnum;
  readonly roles: Array<RolesEnum>;
  status: StatusEnum;
}
