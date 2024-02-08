import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../schemas/user.schema';
import { UserRepository } from '../../repository/repositories/user.repository';
import { getBaseHost } from '../../config/config.service';
import { UserResponse } from '../../common/dto/user/response/user.response';
import { UpdateUserDto } from '../../common/dto/user/request/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // GET USER
  public async getUser(userId: string): Promise<UserResponse> {
    const getUser = await this.userRepository.findOne({ _id: userId });

    if (!getUser) {
      throw new NotFoundException(`User not found`);
    }

    return UserResponse.mapFrom(getUser);
  }

  // UPDATE AVATAR
  public async updateAvatar(
    file: Express.Multer.File,
    userId: string,
  ): Promise<User> {
    if (!file) {
      throw new NotFoundException(`File not found`);
    }

    const avatarUrl = `${getBaseHost()}/files/avatars/${file.filename}`;

    return await this.userRepository.updateNew(userId, {
      avatarUrl,
    });
  }

  // UPDATE USER
  public async updateUser(
    updateData: UpdateUserDto,
    id: string,
  ): Promise<User> {
    const { name, email, password } = updateData;
    const data: { password?: string; email?: string; name?: string } = {};
    if (password) {
      data.password = await bcrypt.hash(updateData.password, 10);
    }

    if (name) {
      data.name = name;
    }

    if (email) {
      data.email = email;
    }

    const getUser = this.userRepository.updateNew(id, data);
    if (!getUser) {
      throw new NotFoundException(`User not found`);
    }
    return getUser;
  }
}
