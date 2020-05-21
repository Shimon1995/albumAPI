import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { IUser } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { Result } from 'src/interfaces/result.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async add(
    createUserDto: CreateUserDTO,
    roles: Array<string>,
  ): Promise<IUser> {
    const saltRoutes = 10;
    const salt = await bcrypt.genSalt(saltRoutes);
    const hash = await bcrypt.hash(createUserDto.password, salt);

    const createUser = new this.userModel(
      _.assignIn(createUserDto, { password: hash, roles }),
    );

    const user = await createUser.save();
    return user;
  }

  async remove(_id: string): Promise<Result> {
    return this.userModel.remove({ _id }).exec();
  }

  async find(_id: string) {
    return this.userModel.findById(_id).exec();
  }

  async findByEmail(email: string): Promise<IUser> {
    return this.userModel.findOne({ email }).exec();
  }

  findByUsername(username: string): Promise<IUser> {
    return this.userModel.findOne({ username }).exec();
  }
}
