import { Schema, Types } from 'mongoose';

export const ImageSchema = new Schema({
  aId: { type: Types.ObjectId, required: true, ref: 'Album' },
  addingDate: { type: Date, required: true },
  image: { type: String, required: true },
});
