import { Module } from '@nestjs/common';
import { JwtRegisterModule } from '../jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [JwtRegisterModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
