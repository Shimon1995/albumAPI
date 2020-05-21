import { Schema } from 'mongoose';
import { GenderEnum } from '../enums/gender.enum';
import { StatusEnum } from '../enums/status.enum';
import { RolesEnum } from '../enums/roles.enum';

export const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  address: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    addressLine1: { type: String, default: null },
    addressLine2: { type: String, default: null },
  },
  gender: { type: String, required: true, enum: Object.values(GenderEnum) },
  status: {
    type: String,
    default: StatusEnum.pending,
    enum: Object.values(StatusEnum),
  },
  roles: { type: [String], required: true, enum: Object.values(RolesEnum) },
});
