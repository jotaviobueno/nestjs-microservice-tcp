import { $Enums, Notification, Prisma } from '@prisma/client';

export class NotificationEntity implements Notification {
  id: string;
  title: string;
  content: Prisma.JsonValue | null;
  context: Prisma.JsonValue | null;
  recipientId: string | null;
  template: string | null;
  to: string;
  channel: $Enums.Channel;
  status: $Enums.NotificationStatus;
  error: Prisma.JsonValue | null;
  retryCount: number;
  scheduledAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(data: Partial<NotificationEntity>) {
    this.id = data.id;
    this.to = data.to;
    this.title = data.title;
    this.content = data.content;
    this.context = data.context;
    this.recipientId = data.recipientId;
    this.template = data.template;
    this.channel = data.channel;
    this.status = data.status;
    this.error = data.error;
    this.retryCount = data.retryCount;
    this.scheduledAt = data.scheduledAt;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.deletedAt = data.deletedAt;
  }
}
