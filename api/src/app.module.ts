import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { EventModule } from './infrastructure/event/event.module';
import { HealthModule } from './infrastructure/health/health.module';
import { QueueModule } from './infrastructure/queue/queue.module';
import { RedisModule } from './infrastructure/redis/redis.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    DatabaseModule,
    EventModule,
    HealthModule,
    QueueModule,
    RedisModule,
    UserModule,
  ],
})
export class AppModule {}
