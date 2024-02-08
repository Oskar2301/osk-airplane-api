import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  @Get('avatars/:filename')
  async getPicture(@Param('filename') filename: string, @Res() res: Response) {
    res.sendFile(filename, { root: './src/assets/userAvatar' });
  }

  @Get('trip/:filename')
  async getTripPicture(
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    res.sendFile(filename, { root: './src/assets/tripImage' });
  }
}
