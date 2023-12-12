import { Injectable, NotFoundException } from '@nestjs/common';
import { TripCreateDto } from '../../common/dto/trip-create.dto';
import { TripsRepository } from '../../repository/repositories/trips.repository';
import { Trip } from '../../schemas/trips.schema';

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
  public async createTrips(trip: TripCreateDto): Promise<Trip> {
    return await this.tripRepository.create(trip);
  }

  // DELETE TRIP
  public async deleteTrip(id: string): Promise<{ success: boolean }> {
    const result = await this.tripRepository.delete(id);

    if (!result) {
      throw new NotFoundException('Trip not found');
    }

    return { success: true };
  }
}
