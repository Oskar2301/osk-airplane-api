import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MainModule } from './modules/main.module';
import { RepositoryModule } from './repository/repository.module';
import { getDbUrl } from './config/config.service';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    MongooseModule.forRoot(getDbUrl()),
    ConfigModule,
    RepositoryModule,
    MailModule,
    MainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
