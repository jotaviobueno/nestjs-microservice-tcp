import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { EVENTS_ENUM, EventPayloads } from 'src/common/enum';
import { render } from '@react-email/render';
import { UserUpdatedEmail } from '../../templates/user/UserUpdated';
import { SESService } from 'src/infrastructure/aws/services/ses.service';
import { $Enums } from '@prisma/client';

@Injectable()
export class UserUpdatedUseCase {
  constructor(
    private readonly sesService: SESService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @OnEvent(EVENTS_ENUM.USER_MAIL_UPDATED)
  async execute(payload: EventPayloads['user.mail.updated']): Promise<void> {
    const html = await render(UserUpdatedEmail(payload.context));

    this.sesService
      .sendMail({
        to: payload.to,
        subject: 'Atualização de conta',
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
