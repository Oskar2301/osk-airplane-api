import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from '../config/config.service';

const { jwtExpire, jwtSecret } = getJwtConfig();

export const JwtRegisterModule = JwtModule.register({
  secret: jwtSecret,
  signOptions: {
    expiresIn: jwtExpire,
  },
});
