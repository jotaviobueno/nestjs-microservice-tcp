import {
  NOTIFICATION_CHANNEL_ENUM,
  NOTIFICATION_TEMPLATES_ENUM,
} from 'src/common/enums';

export class CreateNotificationDto {
  template: NOTIFICATION_TEMPLATES_ENUM;
  context?: any;
  to: string;
  channel: NOTIFICATION_CHANNEL_ENUM;
  scheduledAt?: Date;

  constructor(data: Partial<CreateNotificationDto>) {
    this.template = data.template;
    this.context = data.context;
    this.to = data.to;
    this.channel = data.channel;
    this.scheduledAt = data.scheduledAt;
  }
}
