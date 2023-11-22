import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';

@Injectable()
export class MailSendService {
  constructor(private readonly mailerService: MailerService) {}
  public sendForgotPassword(
    email: string,
    token: string,
    name: string,
  ): Promise<void> {
    const url = `http://localhost:4200/change-password?token=${token}`;

    return this.mailerService.sendMail({
      to: email,
      subject: 'Account password recovery - OSK Airplane.',
      template: './forgot',
      context: { name, url },
      attachments: [
        {
          filename: 'logo.png',
          path: join(__dirname, '../../src/images/logo.png'),
          cid: 'logo',
        },
        {
          filename: 'lock.png',
          path: join(__dirname, '../../src/images/lock.png'),
          cid: 'lock',
        },
      ],
    });
  }
}
