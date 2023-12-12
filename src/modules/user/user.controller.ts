import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageAvatar } from '../files/storages/avatar.storage';
import { User } from '../../schemas/user.schema';
import { UserResponse } from '../../common/dto/user/response/user.response';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-info')
  getInfo(@GetUser() user): Promise<UserResponse> {
    return this.userService.getUser(user.id);
  }

  @Post('update-avatar')
  @UseInterceptors(FileInterceptor('file', storageAvatar))
  updateAvatar(
    @GetUser() user,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<User> {
    return this.userService.updateAvatar(file, user.id);
  }
}
