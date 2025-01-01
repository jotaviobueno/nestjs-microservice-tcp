import { Module } from '@nestjs/common';
import { AWSModule } from '../aws/aws.module';
import { UserCreatedUseCase } from './use-cases/user/user-created.use-case';
import { UserDeletedUseCase } from './use-cases/user/user-deleted.use-case';
import { UserUpdatedUseCase } from './use-cases/user/user-updated-use-case';

@Module({
  imports: [AWSModule],
  providers: [UserCreatedUseCase, UserUpdatedUseCase, UserDeletedUseCase],
})
export class MailModule {}
