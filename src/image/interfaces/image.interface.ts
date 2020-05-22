import { Document } from 'mongoose';

export interface IImage extends Document {
  aId: string;
  link: string;
}
