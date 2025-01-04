import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { EVENTS_ENUM, EventPayloads } from 'src/common/enum';
import { render } from '@react-email/render';
import { UserDeletedEmail } from '../../templates/user/UserDeleted';
import { SESService } from 'src/infrastructure/aws/services/ses.service';
import { $Enums } from '@prisma/client';

@Injectable()
export class UserDeletedUseCase {
  constructor(
    private readonly sesService: SESService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @OnEvent(EVENTS_ENUM.USER_MAIL_DELETED)
  async execute(payload: EventPayloads['user.mail.deleted']): Promise<void> {
    const html = await render(UserDeletedEmail(payload.context));

    this.sesService
      .sendMail({
        to: payload.to,
        subject: 'Conta deletada',
        html,
      })
      .then(() => {
        payload.status = $Enums.NotificationStatus.DELIVERED;
        payload.error = null;
      })
      .catch((error) => {
        payload.status = $Enums.NotificationStatus.FAILED;
        payload.retryCount = payload.retryCount + 1;
        payload.error = error;
      })
      .finally(() => {
        if (payload.retryCount >= 3) {
          payload.status = $Enums.NotificationStatus.CANCELLED;
        }

        this.eventEmitter.emit(EVENTS_ENUM.UPDATE_NOTIFICATION, payload);
      });
  }
}
