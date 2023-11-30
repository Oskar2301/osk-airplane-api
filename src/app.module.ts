import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MyConfigModule } from './config.module';
import { MainModule } from './modules/main.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MyConfigModule,
    ConfigModule,

    // CONNECT MONGODB
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),

    //CONNECT NODEMAILER
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          port: 587,
          auth: {
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `OSK Airplane <${configService.get('MAIL_FROM')}>`,
        },
        template: {
          dir: join(__dirname, 'src/templates/email'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
    }),
    MainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
