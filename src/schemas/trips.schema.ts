import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Trip {
  @Prop()
  name: string;

  @Prop()
  countPlaces: number;

  @Prop()
  cost: number;

  @Prop()
  type: string;

  @Prop()
  country: string;

  @Prop()
  image: string;

  @Prop()
  date: Date;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
