import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { environment } from 'src/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    if (environment.NODE_ENV != 'production')
      super({ log: ['error', 'query', 'info', 'warn'] });
    else super({ log: ['error', 'warn', 'info'] });
  }

  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      return next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit' as never, async () => {
      await app.close();
    });
  }
}
