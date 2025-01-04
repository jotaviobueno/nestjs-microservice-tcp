import {
  OnQueueActive,
  OnQueueCompleted,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Job } from 'bull';
import { JOBS_ENUM, QUEUES_ENUM } from 'src/common/enum';
import { NotificationEntity } from 'src/domain/entities';

@Processor(QUEUES_ENUM.NOTIFICATION)
export class NotificationConsumer {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Process(JOBS_ENUM.SEND_EMAIL_NOTIFICATION)
  async sendEmailNotification({ data }: Job<NotificationEntity>) {
    this.eventEmitter.emit(data.template, data);
  }

  @Process(JOBS_ENUM.SEND_PUSH_NOTIFICATION)
  async sendPushNotification({ data }: Job<NotificationEntity>) {
    this.eventEmitter.emit(data.template, data);
  }

  @Process(JOBS_ENUM.SEND_SMS_NOTIFICATION)
  async sendSmsNotification({ data }: Job<NotificationEntity>) {
    this.eventEmitter.emit(data.template, data);
  }

  @OnQueueActive()
  onQueueEvent(job: Job) {
    Logger.warn(`Job ${job.name} is active`);
  }

  @OnQueueCompleted()
  onQueueCompleted(job: Job) {
    Logger.warn(
      `Job ${job.name} completed, jobTime: ${Math.abs(
        (job.processedOn - job.finishedOn) / 1000,
      )} seconds`,
    );
  }
}
