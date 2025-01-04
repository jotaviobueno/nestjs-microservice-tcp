import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationModule } from '../notification/notification.module';
import { BullModule } from '@nestjs/bull';
import { QUEUES_ENUM } from 'src/common/enum';

@Module({
  imports: [
    NotificationModule,
    ScheduleModule.forRoot(),
    BullModule.registerQueue({
      name: QUEUES_ENUM.NOTIFICATION,
    }),
  ],
  providers: [TaskService],
})
export class TaskModule {}
