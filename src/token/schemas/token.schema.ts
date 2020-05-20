import { Schema, Types } from 'mongoose';

export const TokenSchema = new Schema({
  token: { type: String, required: true, unique: true },
  uId: {
    type: Types.ObjectId,
    unique: true,
    ref: 'User',
    required: true,
  },
  expiresAt: { type: Date, required: true },
});
