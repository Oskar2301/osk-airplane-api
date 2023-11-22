import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/user.schema';
import { Model, Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from '../../dto/signup.dto';
import { SignInDto } from '../../dto/signin.dto';
import { ForgotDto } from '../../dto/forgot.dto';
import { MailSendService } from '../../common/services/mail.service';
import { ChangePasswordDto } from '../../dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailSendService,
  ) {}

  // REGISTER
  public async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;
    const userExist = await this.doesUserExists(email);

    if (userExist) {
      throw new ConflictException('User already exist');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.getToken(user);

    return { token };
  }

  // LOGIN
  public async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    const { email, password } = signInDto;
    const user = await this.doesUserExists(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.getToken(user);

    return { token };
  }

  // CHANGE PASSWORD
  public async changePassword(
    id: Types.ObjectId,
    changePasswordDto: ChangePasswordDto,
  ): Promise<{ success: boolean }> {
    const filter = { _id: id };
    const { password } = changePasswordDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(id, password);

    const update = { password: hashedPassword };

    await this.userModel.findOneAndUpdate(filter, update);
    return { success: true };
  }

  // FORGOT
  public async forgotPassword(
    forgotDto: ForgotDto,
  ): Promise<{ success: boolean }> {
    const { email } = forgotDto;
    const expiresIn = '24h';

    const user = await this.doesUserExists(email);

    if (!user) {
      throw new UnauthorizedException('Email not exist');
    }

    const token = this.getToken(user, { expiresIn });
    await this.mailService.sendForgotPassword(email, token, user.name);
    return { success: true };
  }

  // EXIST USER
  private async doesUserExists(
    email: string,
  ): Promise<User & { _id: Types.ObjectId }> {
    return this.userModel.findOne({ email });
  }

  // TOKEN
  private getToken(
    user: User & { _id: Types.ObjectId },
    options?: { expiresIn: string },
  ) {
    return this.jwtService.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      options,
    );
  }
}
