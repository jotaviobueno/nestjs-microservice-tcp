import { Module } from '@nestjs/common';
import { MailModule } from './infrastructure/mail/mail.module';
import { EventModule } from './infrastructure/event/event.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AWSModule } from './infrastructure/aws/aws.module';
import { TranslatorModule } from './i18n/translator.module';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
  imports: [
    MailModule,
    EventModule,
    DatabaseModule,
    AWSModule,
    TranslatorModule,
    NotificationModule,
  ],
})
export class AppModule {}
