import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignOptions } from 'jsonwebtoken';
import * as moment from 'moment';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { IUser } from 'src/user/interfaces/user.interface';
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
import { ITokenPayload } from 'src/token/interfaces/token-payload.interface';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/mail/mail.service';
import { CreateTokenDTO } from 'src/token/dto/create-token.dto';
import { RolesEnum } from 'src/user/enums/roles.enum';
import { StatusEnum } from 'src/user/enums/status.enum';
import { SignInDTO } from './dto/signin.dto';
import { UserSensitiveEnum } from 'src/user/enums/protected-fields.enum';
import { IMail } from 'src/mail/interfaces/mail.interface';

@Injectable()
export class AuthService {
  private clientAppUrl: string;
  constructor(
    private JwtService: JwtService,
    private userService: UserService,
    private tokenService: TokenService,
    private mailService: MailService,
    private configService: ConfigService,
  ) {
    this.clientAppUrl = this.configService.get<string>('CLIENTAPP');
  }

  async signUp(createUserDto: CreateUserDTO) {
    const user = await this.userService.add(createUserDto, [RolesEnum.user]);
    await this.sendConfirmation(user);
  }
  async logIn({ email, password }: SignInDTO): Promise<IReadableUser> {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      if (user.status !== StatusEnum.active) {
        throw new UnauthorizedException();
      }

      const toknePayload = {
        _id: user._id,
        status: user.status,
        roles: user.roles,
      };

      const token = await this.generateToken(toknePayload);
      const expiresAt = moment()
        .add(1, 'day')
        .toISOString();
      await this.saveToken({ token, expiresAt, uId: user._id });

      const readableUser = user.toObject() as IReadableUser;
      readableUser.accessToken = token;

      return _.omit<any>(
        readableUser,
        Object.values(UserSensitiveEnum),
      ) as IReadableUser;
    }
    throw new BadRequestException('Bad credentials');
  }

  async confirm(token: string) {
    const data = await this.verifyToken(token);
    const user = await this.userService.find(data._id);

    console.log(data, user);

    await this.tokenService.delete(data._id, token);

    if (user && user.status === StatusEnum.pending) {
      user.status = StatusEnum.active;
      return user.save();
    }
    throw new BadRequestException('Confirmation Error');
  }
  private async sendConfirmation(user: IUser) {
    const expiresIn = 60 * 60 * 24;
    const tokenPayload = {
      _id: user._id,
      status: user.status,
      roles: user.roles,
    };
    const expiresAt = moment()
      .add(1, 'day')
      .toISOString();

    const token = await this.generateToken(tokenPayload, { expiresIn });
    const tokenLink = `${this.clientAppUrl}/auth/confirm?token=${token}`;

    await this.saveToken({ token, uId: user._id, expiresAt });

    this.mailService.send({
      from: 'Album Bot',
      to: user.email,
      subject: 'Verify User',
      html: `
        <h3>Hello, ${user.firstName}</h3>
        <p>Please, use this <a href=${tokenLink}>link</a> to confirm your account.</p>
      `,
    } as IMail);
  }
  private async generateToken(
    data: ITokenPayload,
    options?: SignOptions,
  ): Promise<string> {
    return this.JwtService.sign(data, options);
  }
  private async verifyToken(token: string): Promise<ITokenPayload> {
    try {
      const data = (await this.JwtService.verify(token)) as ITokenPayload;
      const tokenExists = await this.tokenService.exists(data._id, token);
      if (tokenExists) {
        return data;
      }
      throw new UnauthorizedException();
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
  private async saveToken(createTokenDto: CreateTokenDTO) {
    return this.tokenService.create(createTokenDto);
  }
}
