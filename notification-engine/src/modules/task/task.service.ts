import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationService } from '../notification/notification.service';
import { JOBS_ENUM, QUEUES_ENUM } from 'src/common/enum';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { $Enums } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(
    private readonly notificationService: NotificationService,
    @InjectQueue(QUEUES_ENUM.NOTIFICATION)
    private readonly notificationQueue: Queue,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleNotifications() {
    const notifications = await this.notificationService.findMany();

    const jobs = notifications.map((notification) => {
      let jobName: string;

      switch (notification.channel) {
        case $Enums.Channel.EMAIL:
          jobName = JOBS_ENUM.SEND_EMAIL_NOTIFICATION;
          break;
        case $Enums.Channel.SMS:
          jobName = JOBS_ENUM.SEND_SMS_NOTIFICATION;
          break;
        case $Enums.Channel.PUSH:
          jobName = JOBS_ENUM.SEND_PUSH_NOTIFICATION;
          break;
        default:
          throw new Error(`Invalid channel: ${notification.channel}`);
      }

      return this.notificationQueue.add(jobName, notification, {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
        removeOnComplete: true,
      });
    });

    await Promise.all(jobs);
  }
}
