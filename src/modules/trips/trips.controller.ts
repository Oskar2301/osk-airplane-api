import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { TripsService } from './trips.service';
import { TripCreateDto } from '../../common/dto/trip-create.dto';
import { Trip } from '../../schemas/trips.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { tripStorage } from '../files/storages/trip.storage';

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
  @UseInterceptors(FileInterceptor('file', tripStorage))
  addTrips(
    @UploadedFile() file: Express.Multer.File,
    @Body() trip: TripCreateDto,
  ): Promise<Trip> {
    return this.tripsService.createTrips(trip, file);
  }

  @Post('/search')
  searchTrips(@Body() { search }: any): Promise<Trip[]> {
    return this.tripsService.searchTrips(search);
  }

  @Delete('/delete/:id')
  deleteTrips(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.tripsService.deleteTrip(id);
  }
}
