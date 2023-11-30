import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export const JwtRegisterModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    return {
      secret: config.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: config.get<string | number>('JWT_EXPIRE'),
      },
    };
  },
});
