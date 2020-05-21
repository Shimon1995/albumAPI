import { Document } from 'mongoose';

export interface IComment extends Document {
  avatar?: string;
  username: string;
  content: string;
}
