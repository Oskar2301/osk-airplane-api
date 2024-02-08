import { Injectable, NotFoundException } from '@nestjs/common';
import { TripCreateDto } from '../../common/dto/trip-create.dto';
import { TripsRepository } from '../../repository/repositories/trips.repository';
import { Trip } from '../../schemas/trips.schema';
import { getBaseHost } from '../../config/config.service';

@Injectable()
export class TripsService {
  constructor(private readonly tripRepository: TripsRepository) {}

  // GET TRIPS
  public async getTrips(): Promise<Trip[]> {
    return this.tripRepository.findAll();
  }

  // GET ONE
  public async getOneTrip(id: string): Promise<Trip> {
    const trip = await this.tripRepository.findOne({ _id: id });

    if (!trip) {
      throw new NotFoundException(`Trip not found`);
    }

    return trip;
  }

  // CREATE TRIPS
  public async createTrips(
    trip: TripCreateDto,
    file: Express.Multer.File,
  ): Promise<Trip> {
    const avatarUrl = `${getBaseHost()}/files/trip/${file.filename}`;
    return await this.tripRepository.create({ ...trip, image: avatarUrl });
  }

  // DELETE TRIP
  public async deleteTrip(id: string): Promise<{ success: boolean }> {
    const result = await this.tripRepository.delete(id);

    if (!result) {
      throw new NotFoundException('Trip not found');
    }

    return { success: true };
  }

  // SEARCH TRIP
  public async searchTrips(value: string): Promise<Trip[]> {
    if (!value) {
      throw new NotFoundException('Value should not be empty');
    }

    return await this.tripRepository.findAll({ name: new RegExp(value, 'i') });
  }
}
