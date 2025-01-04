import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { BullModule } from '@nestjs/bull';
import { QUEUES_ENUM } from 'src/common/enum';
import { NotificationConsumer } from './consumers/notification.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUES_ENUM.NOTIFICATION,
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationConsumer],
  exports: [NotificationService],
})
export class NotificationModule {}
