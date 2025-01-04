import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { render } from '@react-email/render';
import { UserCreated } from '../../templates/user/UserCreated';
import { EventPayloads, EVENTS_ENUM } from 'src/common/enum';
import { SESService } from 'src/infrastructure/aws/services/ses.service';
import { $Enums } from '@prisma/client';

@Injectable()
export class UserCreatedUseCase {
  constructor(
    private readonly sesService: SESService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @OnEvent(EVENTS_ENUM.USER_MAIL_CREATED)
  async execute(payload: EventPayloads['user.mail.created']): Promise<void> {
    const html = await render(UserCreated(payload.context));

    this.sesService
      .sendMail({
        to: payload.to,
        subject: 'Criação de conta',
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
