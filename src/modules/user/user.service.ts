import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {IUser} from "../../common/interfaces/user.interface";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // GET USER
  public async getUser(userId: string): Promise<IUser> {
    const getUser = await this.userModel.findOne({ _id: userId });

    if (!getUser) {
      throw new NotFoundException(`User not found`);
    }

    const { password, ...updateUser} = getUser.toObject();
    return updateUser;
  }

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
