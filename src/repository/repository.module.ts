import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { UserRepository } from './repositories/user.repository';
import { JwtRegisterModule } from '../modules/jwt';
import { Trip, TripSchema } from '../schemas/trips.schema';
import { TripsRepository } from './repositories/trips.repository';

const providers = [UserRepository, TripsRepository];

const models = [
  { name: User.name, schema: UserSchema },
  { name: Trip.name, schema: TripSchema },
];

@Global()
@Module({
  imports: [MongooseModule.forFeature([...models]), JwtRegisterModule],
  providers,
  exports: [...providers, MongooseModule.forFeature([...models])],
})
export class RepositoryModule {}
