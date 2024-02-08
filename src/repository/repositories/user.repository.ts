import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/user.schema';
import { Model, Types } from 'mongoose';
import { SignUpDto } from '../../common/dto/auth/request/signup.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: SignUpDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOne(query: Record<string, any>): Promise<User> {
    return this.userModel.findOne(query);
  }

  async update(
    id: Types.ObjectId | string,
    data: Partial<User>,
  ): Promise<User> {
    return this.userModel.findOneAndUpdate({ _id: id }, data);
  }

  async updateNew(
    id: Types.ObjectId | string,
    data: Partial<User>,
  ): Promise<User> {
    return this.userModel.findOneAndUpdate({ _id: id }, data, { new: true });
  }

  getToken(
    user: User & { _id: Types.ObjectId },
    options: { expiresIn: string } = { expiresIn: '7d' },
  ): string {
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
