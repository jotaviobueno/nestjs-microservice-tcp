import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { environment } from 'src/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    if (environment.NODE_ENV != 'production') {
      super({ log: ['error', 'query', 'warn', 'info'] });
    } else {
      super({ log: ['error', 'info', 'warn'] });
    }
  }

  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      const where = {
        ...params.args.where,
        deletedAt: null,
      };

      switch (params.action) {
        case 'findFirst':
          params.args.where = where;
          break;
        case 'findMany':
          params.args.where = where;
          break;

        case 'create':
          params.args.data = {
            ...params.args.data,
            deletedAt: null,
          };
          break;
        case 'count':
          params.args.where = where;
          break;
      }

      return next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit' as never, async () => {
      await app.close();
    });
  }
}
