import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { User } from '../../schemas/user.schema';
import { UserService } from './user.service';
import { UploadAvatarDto } from '../../dto/upload-avatar.dto';
import {IUser} from "../../common/interfaces/user.interface";

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/get-info')
  getInfo(
      @GetUser() user,
  ): Promise<IUser> {
    return this.userService.getUser(user.id);
  }

  @Post('/update-avatar')
  updateAvatar(
    @GetUser() user,
    @Body() { url }: UploadAvatarDto,
  ): Promise<User> {
    return this.userService.updateAvatar(url, user.id);
  }
}
