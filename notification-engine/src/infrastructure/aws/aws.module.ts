import { Module } from '@nestjs/common';
import { SESService } from './services/ses.service';

@Module({
  providers: [SESService],
  exports: [SESService],
})
export class AWSModule {}
