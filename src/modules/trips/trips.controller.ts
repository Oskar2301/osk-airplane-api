import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { TripsService } from './trips.service';
import { TripCreateDto } from '../../common/dto/trip-create.dto';
import { Trip } from '../../schemas/trips.schema';

@UseGuards(AuthGuard)
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get('/all-trip')
  getAllTrip(): Promise<Trip[]> {
    return this.tripsService.getTrips();
  }

  @Get('/get-one/:id')
  getOneTrip(@Param('id') id: string): Promise<Trip> {
    return this.tripsService.getOneTrip(id);
  }

  @Post('/add')
  @UsePipes(new ValidationPipe())
  addTrips(@Body() trip: TripCreateDto): Promise<Trip> {
    return this.tripsService.createTrips(trip);
  }

  @Delete('/delete/:id')
  deleteTrips(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.tripsService.deleteTrip(id);
  }
}
