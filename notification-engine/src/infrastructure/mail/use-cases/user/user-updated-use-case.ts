import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EVENTS_ENUM, EventPayloads } from 'src/common/enum';
import { TranslatorService } from 'src/i18n/services/translator.service';
import { render } from '@react-email/render';
import { UserUpdatedEmail } from '../../templates/user/UserUpdated';
import { SESService } from 'src/infrastructure/aws/services/ses.service';
import { I18N_PATHS } from 'src/common/i18n';

@Injectable()
export class UserUpdatedUseCase {
  constructor(
    private readonly sesService: SESService,
    private readonly translateService: TranslatorService,
  ) {}

  @OnEvent(EVENTS_ENUM.user.updated)
  async execute(payload: EventPayloads['user']['updated']): Promise<void> {
    const context = this.translateService.getTranslatedMessages(
      I18N_PATHS.EMAILS.user.updated,
      {
        args: payload,
      },
    );

    const html = await render(UserUpdatedEmail(context));

    await this.sesService.sendMail({
      to: payload.email,
      subject: context.subject,
      html,
    });
  }
}
