import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from '../../common/dto/auth/request/signup.dto';
import { SignInDto } from '../../common/dto/auth/request/signin.dto';
import { ForgotDto } from '../../common/dto/auth/request/forgot.dto';
import { ChangePasswordDto } from '../../common/dto/auth/request/change-password.dto';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/forgot')
  forgotPassword(@Body() forgotDto: ForgotDto): Promise<{ success: boolean }> {
    return this.authService.forgotPassword(forgotDto);
  }

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  signIn(@Body() signInDto: SignInDto): Promise<{ token: string }> {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @Post('/change-password')
  changePassword(
    @GetUser() user,
    @Body()
    changePasswordDto: ChangePasswordDto,
  ): Promise<{ success: boolean }> {
    return this.authService.changePassword(user.id, changePasswordDto);
  }
}
