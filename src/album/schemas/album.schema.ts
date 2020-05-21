import { Schema, Types } from 'mongoose';

export const AlbumSchema = new Schema({
  uId: { type: Types.ObjectId, ref: 'User', default: null, unique: false },
  name: { type: String, required: true, unique: true },
  // images: {
  // to add _id in future for each image to ref comments by the _id
  //   type: [String],
  //   required: true,
  // },
});
