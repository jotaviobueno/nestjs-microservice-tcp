import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EVENTS_ENUM, EventPayloads } from 'src/common/enum';
import { I18N_PATHS } from 'src/common/i18n';
import { TranslatorService } from 'src/i18n/services/translator.service';
import { render } from '@react-email/render';
import { UserDeletedEmail } from '../../templates/user/UserDeleted';
import { SESService } from 'src/infrastructure/aws/services/ses.service';

@Injectable()
export class UserDeletedUseCase {
  constructor(
    private readonly sesService: SESService,
    private readonly translateService: TranslatorService,
  ) {}

  @OnEvent(EVENTS_ENUM.user.deleted)
  async execute(payload: EventPayloads['user']['deleted']): Promise<void> {
    const context = this.translateService.getTranslatedMessages(
      I18N_PATHS.EMAILS.user.deleted,
      {
        args: payload,
      },
    );

    const html = await render(UserDeletedEmail(context));

    await this.sesService.sendMail({
      to: payload.email,
      subject: context.subject,
      html,
    });
  }
}
