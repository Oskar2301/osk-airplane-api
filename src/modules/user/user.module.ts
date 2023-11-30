import { Module } from '@nestjs/common';
import { JwtRegisterModule } from '../jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtRegisterModule,
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
