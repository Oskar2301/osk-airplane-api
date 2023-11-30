import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../schemas/user.schema';
import { JwtRegisterModule } from '../jwt';
import { MailSendService } from '../../common/services/mail.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtRegisterModule,
  ],
  providers: [AuthService, MailSendService],
  controllers: [AuthController],
})
export class AuthModule {}
