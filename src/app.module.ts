import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { MailModule } from './mail/mail.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    TokenModule,
    MailModule,
    AlbumModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
