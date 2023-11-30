import { IsNotEmpty, IsUrl } from 'class-validator';

export class UploadAvatarDto {
  @IsNotEmpty()
  @IsUrl()
  readonly url: string;
}
