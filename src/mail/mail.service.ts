import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { IMail } from './interfaces/mail.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  async send(data: IMail) {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'chaya.kemmer@ethereal.email',
          pass: 'xKhddhj5RqkJ36xVPX',
        },
      });

      await transporter.sendMail(data);
    } catch (error) {
      console.error(error);
    }
  }
}
