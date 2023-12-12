import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtRegisterModule } from '../jwt';

@Module({
  imports: [JwtRegisterModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
