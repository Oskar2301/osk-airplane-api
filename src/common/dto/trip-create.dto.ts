import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class TripCreateDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly countPlaces: number;

  @IsNumber()
  @IsNotEmpty()
  readonly cost: number;

  @IsNotEmpty()
  @IsString()
  readonly type: string;

  @IsNotEmpty()
  @IsString()
  readonly country: string;

  readonly image: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  readonly date: Date;
}
