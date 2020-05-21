import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { IMail } from './interfaces/mail.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  async send(data: IMail) {
    const user = this.configService.get<string>('EMAIL');
    const pass = this.configService.get<string>('PASSWORD');
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user,
          pass,
        },
      });

      await transporter.sendMail(data);
    } catch (error) {
      console.error(error);
    }
  }
}
