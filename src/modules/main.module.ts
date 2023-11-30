import { Module } from '@nestjs/common';
import { TripsModule } from './trips/trips.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TripsModule, AuthModule, UserModule],
  providers: [],
  controllers: [],
})
export class MainModule {}
