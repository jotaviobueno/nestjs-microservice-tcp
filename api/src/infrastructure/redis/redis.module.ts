import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { RedisClientOptions } from 'redis';
import { environment } from 'src/config';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      url: environment.REDIS.URL,
      ttl: 3000,
    }),
  ],
})
export class RedisModule {}
