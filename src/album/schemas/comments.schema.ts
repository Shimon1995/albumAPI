import { Schema, Types } from 'mongoose';

export const CommentsSchema = new Schema({
  // name and image are gonna be got from user by id
  aId: { type: Types.ObjectId, ref: 'Album', unique: false },
  uId: { type: Types.ObjectId, ref: 'User', unique: false },
  content: { type: String, required: true },
});
