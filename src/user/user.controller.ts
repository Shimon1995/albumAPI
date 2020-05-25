import {
  Controller,
  Get,
  Post,
  ValidationPipe,
  Param,
  Body,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './interfaces/user.interface';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FindUserDTO } from './dto/get-user.dto';
import { Result } from 'src/interfaces/result.interface';
import { ModifyUserDTO } from './dto/modify-user.dto';
import { IReadableUser } from './interfaces/readable-user.interface';
import { JwtGuard } from 'src/guards/jwt.guard';
import { AdminGuard } from 'src/guards/admin.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getUsers')
  getUsers(): Promise<IUser[]> {
    return this.userService.getUsers();
  }

  @Get(':username')
  getUser(@Param('username') username: string): Promise<IReadableUser> {
    return this.userService.getUser(username);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard, AdminGuard)
  @Post('block')
  blockUser(@Body(ValidationPipe) blockUserDto: FindUserDTO): Promise<Result> {
    return this.userService.blockUser(blockUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard, AdminGuard)
  @Delete('deleteUser')
  removeUser(
    @Body(ValidationPipe) removeUserDto: FindUserDTO,
  ): Promise<Result> {
    return this.userService.removeByUsername(removeUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard, AdminGuard)
  @Patch('modifyUser')
  modifyUser(
    @Body(ValidationPipe) modifyUserDto: ModifyUserDTO,
  ): Promise<Result> {
    return this.userService.modifyUser(modifyUserDto);
  }
}
