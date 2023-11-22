import { Controller, Get, UseGuards } from '@nestjs/common';
import { TripsService } from './trips.service';
import { AuthGuard } from '../../common/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('trips')
export class TripsController {
  constructor() {}

  @Get('/all-trip')
  getAllTrip(): string {
    return 'Trips';
  }
}
