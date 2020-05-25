import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

import { IUser } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { Result } from 'src/interfaces/result.interface';
import { FindUserDTO } from './dto/get-user.dto';
import { StatusEnum } from './enums/status.enum';
import { ModifyUserDTO } from './dto/modify-user.dto';
import { IReadableUser } from './interfaces/readable-user.interface';
import { UserSensitiveEnum } from './enums/protected-fields.enum';

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

  async removeById(_id: string): Promise<Result> {
    return this.userModel.remove({ _id }).exec();
  }

  async find(_id: string) {
    const user = await this.userModel.findById(_id).exec();
    if (user) {
      return user;
    }
    throw new InternalServerErrorException();
  }

  async findByEmail(email: string): Promise<IUser> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user) {
      return user;
    }
    throw new InternalServerErrorException();
  }

  async findByUsername(username: string): Promise<IUser> {
    const user = await this.userModel.findOne({ username }).exec();
    if (user) {
      return user;
    }
    throw new InternalServerErrorException();
  }

  // for controller

  getUsers(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }

  async getUser(username: string) {
    const user = await this.findByUsername(username);
    const readableUser = user.toObject() as IReadableUser;
    return _.omit<IReadableUser>(
      readableUser,
      Object.values(UserSensitiveEnum),
    ) as IReadableUser;
  }

  blockUser({ username, options }: FindUserDTO): Promise<Result> {
    const status = StatusEnum.blocked;
    return this.userModel
      .updateOne({ username, ...options }, { status })
      .exec();
  }

  removeByUsername({ username, options }: FindUserDTO): Promise<Result> {
    return this.userModel.deleteOne({ username, ...options }).exec();
  }

  modifyUser({ username, options }: ModifyUserDTO): Promise<Result> {
    return this.userModel.updateOne({ username }, options).exec();
  }
}
