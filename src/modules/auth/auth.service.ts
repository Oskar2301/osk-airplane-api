import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { SignUpDto } from '../../common/dto/auth/request/signup.dto';
import { SignInDto } from '../../common/dto/auth/request/signin.dto';
import { ForgotDto } from '../../common/dto/auth/request/forgot.dto';
import { MailSendService } from '../mail/mail.service';
import { ChangePasswordDto } from '../../common/dto/auth/request/change-password.dto';
import { UserRepository } from '../../repository/repositories/user.repository';
import { UserResponse } from '../../common/dto/user/response/user.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly mailService: MailSendService,
    private readonly userRepository: UserRepository,
  ) {}

  // REGISTER
  public async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;
    const userExist = await this.userRepository.findOne({ email });

    if (userExist) {
      throw new ConflictException('User already exist');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const getUser = UserResponse.mapFrom(user);
    const token = this.userRepository.getToken(getUser);
    return { token };
  }

  // LOGIN
  public async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    const { email, password } = signInDto;
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const getUser = UserResponse.mapFrom(user);
    const token = this.userRepository.getToken(getUser);
    return { token };
  }

  // CHANGE PASSWORD
  public async changePassword(
    id: Types.ObjectId,
    changePasswordDto: ChangePasswordDto,
  ): Promise<{ success: boolean }> {
    const { password } = changePasswordDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const update = { password: hashedPassword };
    await this.userRepository.update(id, update);
    return { success: true };
  }

  // FORGOT
  public async forgotPassword(
    forgotDto: ForgotDto,
  ): Promise<{ success: boolean }> {
    const { email } = forgotDto;
    const expiresIn = '24h';

    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Email not exist');
    }

    const getUser = UserResponse.mapFrom(user);
    const token = this.userRepository.getToken(getUser, { expiresIn });
    await this.mailService.sendForgotPassword(email, token, user.name);
    return { success: true };
  }
}
