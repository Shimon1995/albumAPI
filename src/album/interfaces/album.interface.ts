import { Document } from 'mongoose';

export interface IAlbum extends Document {
  readonly aId: string;
  readonly content: Array<string>;
}
