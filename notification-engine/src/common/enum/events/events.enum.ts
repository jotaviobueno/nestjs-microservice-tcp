import { NotificationEntity } from 'src/domain/entities';

export enum EVENTS_ENUM {
  USER_MAIL_CREATED = 'user.mail.created',
  USER_MAIL_UPDATED = 'user.mail.updated',
  USER_MAIL_DELETED = 'user.mail.deleted',

  UPDATE_NOTIFICATION = 'update.notification',
}

export type EventPayloads = Record<EVENTS_ENUM, NotificationEntity>;
