import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { render } from '@react-email/render';
import { UserCreated } from '../../templates/user/UserCreated';
import { EventPayloads, EVENTS_ENUM } from 'src/common/enum';
import { SESService } from 'src/infrastructure/aws/services/ses.service';
import { TranslatorService } from 'src/i18n/services/translator.service';
import { I18N_PATHS } from 'src/common/i18n';

@Injectable()
export class UserCreatedUseCase {
  constructor(
    private readonly sesService: SESService,
    private readonly translateService: TranslatorService,
  ) {}

  @OnEvent(EVENTS_ENUM.user.created)
  async execute(payload: EventPayloads['user']['created']): Promise<void> {
    const context = this.translateService.getTranslatedMessages(
      I18N_PATHS.EMAILS.user.deleted,
      {
        args: payload,
      },
    );

    const html = await render(UserCreated(context));

    await this.sesService.sendMail({
      to: payload.email,
      subject: context.subject,
      html,
    });
  }
}
