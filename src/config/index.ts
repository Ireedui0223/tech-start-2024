import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: process.env.PORT,
  DATABASE_NAME: process.env.DB_DATABASE,
  DATABASE_USERNAME: process.env.DB_USERNAME,
  DATABASE_PASSWORD: process.env.DB_PASSWORD,
  HASH_SALT: process.env.HASH_SALT,
  JWT_SECRET: process.env.JWT_SECRET
};
