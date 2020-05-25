import {
  Controller,
  ValidationPipe,
  Post,
  Body,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ConfirmAccountDTO } from './dto/confirm-account.dto';
import { LogOutDTO } from "./dto/logout.dto";
import { SignInDTO } from './dto/signin.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { IUser } from 'src/user/interfaces/user.interface';
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
import { Result } from 'src/interfaces/result.interface';
import { JwtGuard } from 'src/guards/jwt.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  signUp(@Body(ValidationPipe) createUserDto: CreateUserDTO) {
    this.authService.signUp(createUserDto);
  }

  @Get('confirm')
  confirm(@Query(ValidationPipe) query: ConfirmAccountDTO): Promise<IUser> {
    return this.authService.confirm(query.token);
  }

  @Post('logIn')
  logIn(@Body(new ValidationPipe()) signInDto: SignInDTO): Promise<IReadableUser> {
    return this.authService.logIn(signInDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('logOut')
  logOut(@Body(ValidationPipe) logOutDto: LogOutDTO): Promise<Result> {
    return this.authService.logOut(logOutDto);
  }
}
