import { $Enums, Notification, Prisma } from '@prisma/client';

export class NotificationEntity implements Notification {
  id: string;
  title: string;
  content: Prisma.JsonValue | null;
  context: Prisma.JsonValue | null;
  recipientId: string | null;
  template: string | null;
  channel: $Enums.Channel;
  provider: $Enums.Provider;
  status: $Enums.NotificationStatus;
  metadata: Prisma.JsonValue | null;
  error: Prisma.JsonValue | null;
  retryCount: number;
  scheduledAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
