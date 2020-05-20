import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IToken } from './interfaces/token.interface';
import { result } from 'src/interfaces/result.interface';
import { CreateTokenDTO } from './dto/create-token.dto';

@Injectable()
export class TokenService {
  constructor(@InjectModel('Token') private tokenModel: Model<IToken>) {}

  async create(createTokenDto: CreateTokenDTO): Promise<IToken> {
    return new this.tokenModel(createTokenDto).save();
  }

  async delete(uId: string, token: string): Promise<result> {
    return this.tokenModel.deleteOne({ uId, token }).exec();
  }

  async deleteAll(uId: string): Promise<result> {
    return this.tokenModel.deleteMany({ uId }).exec();
  }

  async exists(uId: string, token: string): Promise<boolean> {
    return this.tokenModel.exists({ uId, token });
  }
}
