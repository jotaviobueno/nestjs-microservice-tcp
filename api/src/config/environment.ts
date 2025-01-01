export const environment = {
  DATABASE: {
    URL: process.env.DATABASE_URL,
  },
  REDIS: {
    URL: process.env.REDIS_URL,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  },
  PORT: process.env.PORT ?? 3000,
  NODE_ENV: process.env.NODE_ENV,
  VERSION: process.env.npm_package_version,
};
