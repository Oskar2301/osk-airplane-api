import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;
}
