import { User } from '../../../../schemas/user.schema';
import { Expose, plainToClass, Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UserResponse {
  @Expose()
  @Transform((value) => value.obj._id.toString())
  _id: Types.ObjectId;

  @IsString()
  @Expose()
  name: string;

  @IsString()
  @Expose()
  email: string;

  @IsString()
  @IsOptional()
  @Expose()
  avatarUrl: string;

  password: string;

  static mapFrom(user: User): UserResponse {
    return plainToClass(UserResponse, user, {
      excludeExtraneousValues: true,
    });
  }
}
