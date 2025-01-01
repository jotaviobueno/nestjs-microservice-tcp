export const environment = {
  DATABASE: {
    URL: process.env.DATABASE_URL,
  },
  AWS: {
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    SES: {
      BUCKET: process.env.AWS_S3_BUCKET,
      REGION: process.env.AWS_SES_REGION,
      FROM: process.env.AWS_SES_FROM,
      FROM_EMAIL: process.env.AWS_SES_FROM_EMAIL,
    },
  },
  NODE_ENV: process.env.NODE_ENV,
  VERSION: process.env.npm_package_version,
};
