import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trip } from '../../schemas/trips.schema';
import { TripCreateDto } from '../../common/dto/trip-create.dto';

@Injectable()
export class TripsRepository {
  constructor(@InjectModel(Trip.name) private tripModel: Model<Trip>) {}

  async findAll(query?: Record<string, any>): Promise<Trip[]> {
    return this.tripModel.find(query);
  }

  async findOne(query: Record<string, any>): Promise<Trip> {
    return this.tripModel.findOne(query);
  }

  async create(createUserDto: TripCreateDto): Promise<Trip> {
    const createdTrip = new this.tripModel(createUserDto);
    return createdTrip.save();
  }

  async delete(id: string): Promise<Trip> {
    return this.tripModel.findByIdAndDelete(id);
  }
}
