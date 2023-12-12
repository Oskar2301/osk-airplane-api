import { get } from 'env-var';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const getDbUrl = () => {
  return get('MONGODB_URI').asString();
};

export const getBaseHost = () => {
  return get('BASE_HOST').asString();
};

export const getMailerConfig = () => ({
  mailHost: get('MAIL_HOST').asString(),
  mailUser: get('MAIL_USER').asString(),
  mailPassword: get('MAIL_PASSWORD').asString(),
  mailFrom: get('MAIL_FROM').asString(),
});

export const getJwtConfig = () => ({
  jwtSecret: get('JWT_SECRET').asString(),
  jwtExpire: get('JWT_EXPIRE').asString(),
});
