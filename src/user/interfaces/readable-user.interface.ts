import { GenderEnum } from '../enums/gender.enum';
import { StatusEnum } from '../enums/status.enum';
import { Document } from 'mongoose';

export interface IReadableUser extends Document {
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly status: StatusEnum;
  readonly gender: GenderEnum;
  accessToken?: string;
}
