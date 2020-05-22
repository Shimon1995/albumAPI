import { Schema, Types } from 'mongoose';

export const AlbumSchema = new Schema({
  uId: { type: Types.ObjectId, ref: 'User', default: null, unique: false },
  name: { type: String, required: true, unique: true },
});
