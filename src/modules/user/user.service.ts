import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // UPDATE AVATAR
  public async updateAvatar(url: string, userId: string): Promise<User> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: userId },
      { avatarUrl: url },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException(`User not found`);
    }

    return updatedUser;
  }
}
