import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from 'src/domain/dtos';
import { NotificationEntity } from 'src/domain/entities';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern('createNotification')
  create(@Payload() createNotificationDto: CreateNotificationDto) {
    const notificationData = new NotificationEntity(createNotificationDto);
    return this.notificationService.create(notificationData);
  }
}
