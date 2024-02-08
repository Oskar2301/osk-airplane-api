import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;
}
