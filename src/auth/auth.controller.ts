import {
  Controller,
  ValidationPipe,
  Post,
  Body,
  Get,
  Query,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ConfirmAccountDTO } from './dto/confirm-account.dto';
import { SignInDTO } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  signUp(@Body(ValidationPipe) createUserDto: CreateUserDTO) {
    this.authService.signUp(createUserDto);
  }

  @Get('confirm')
  async confirm(@Query(ValidationPipe) query: ConfirmAccountDTO) {
    console.log(query);
    await this.authService.confirm(query.token);
  }

  @Post('logIn')
  async logIn(@Body(new ValidationPipe()) signInDto: SignInDTO) {
    return this.authService.logIn(signInDto);
  }
}
