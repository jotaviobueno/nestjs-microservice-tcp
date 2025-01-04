import { $Enums } from '@prisma/client';
import { EVENTS_ENUM } from 'src/common/enum';

export class CreateNotificationDto {
  template: EVENTS_ENUM;
  context?: any;
  to: string;
  channel: $Enums.Channel;
  scheduledAt?: Date;
}
