import { Module } from '@nestjs/common';
import { TripsModule } from './trips/trips.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TripsModule, AuthModule],
  providers: [],
  controllers: [],
})
export class MainModule {}
