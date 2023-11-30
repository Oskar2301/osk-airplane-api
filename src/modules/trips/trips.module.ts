import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { JwtRegisterModule } from '../jwt';

@Module({
  imports: [JwtRegisterModule],
  providers: [TripsService],
  controllers: [TripsController],
})
export class TripsModule {}
