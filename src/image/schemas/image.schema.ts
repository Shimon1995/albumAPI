import { Schema, Types } from 'mongoose';

export const ImageSchema = new Schema({
  aId: { type: Types.ObjectId, required: true, ref: 'Album' },
  uId: { type: Types.ObjectId, required: true, ref: 'User' },
  addingDate: { type: Date, required: true },
  imageSrc: { type: String, required: true },
});
