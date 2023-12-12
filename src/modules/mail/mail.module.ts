import { Global, Module } from '@nestjs/common';
import { MailSendService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { getMailerConfig } from '../../config/config.service';

const { mailFrom, mailUser, mailPassword, mailHost } = getMailerConfig();

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: mailHost,
        port: 587,
        auth: {
          user: mailUser,
          pass: mailPassword,
        },
      },
      defaults: {
        from: `OSK Airplane <${mailFrom}>`,
      },
      template: {
        dir: join(__dirname, '../../src/templates/email'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: false,
        },
      },
    }),
  ],
  controllers: [],
  providers: [MailSendService],
  exports: [MailSendService],
})
export class MailModule {}
