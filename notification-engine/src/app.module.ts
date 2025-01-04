import { Module } from '@nestjs/common';
import { MailModule } from './infrastructure/mail/mail.module';
import { EventModule } from './infrastructure/event/event.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AWSModule } from './infrastructure/aws/aws.module';
import { NotificationModule } from './modules/notification/notification.module';
import { TaskModule } from './modules/task/task.module';
import { QueueModule } from './infrastructure/queue/queue.module';

@Module({
  imports: [
    MailModule,
    EventModule,
    DatabaseModule,
    AWSModule,
    NotificationModule,
    TaskModule,
    QueueModule,
  ],
})
export class AppModule {}
