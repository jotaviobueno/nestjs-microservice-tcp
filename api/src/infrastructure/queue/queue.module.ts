import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { environment } from 'src/config';

@Module({
  imports: [
    BullModule.forRoot({
      url: environment.REDIS.URL,
    }),
  ],
})
export class QueueModule {}
