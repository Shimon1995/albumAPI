import { Schema, Types } from 'mongoose';

export const CommentsSchema = new Schema({
  // name and image are gonna be got from user by id
  iId: { type: Types.ObjectId, ref: 'Image', unique: false },
  uId: { type: Types.ObjectId, ref: 'User', unique: false },
  content: { type: String, required: true },
});
