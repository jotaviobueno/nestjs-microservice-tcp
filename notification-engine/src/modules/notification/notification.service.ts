import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { $Enums } from '@prisma/client';
import { NotificationEntity } from 'src/domain/entities';
import { OnEvent } from '@nestjs/event-emitter';
import { EVENTS_ENUM } from 'src/common/enum';

@Injectable()
export class NotificationService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: NotificationEntity): Promise<NotificationEntity> {
    const notification = await this.prismaService.notification.create({
      data: createDto,
    });

    return notification;
  }

  @OnEvent(EVENTS_ENUM.UPDATE_NOTIFICATION)
  update(data: NotificationEntity) {
    return this.prismaService.notification.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  findMany(): Promise<NotificationEntity[]> {
    return this.prismaService.notification.findMany({
      where: {
        status: $Enums.NotificationStatus.PENDING,
        AND: {
          OR: [
            {
              scheduledAt: {
                lte: new Date(),
              },
            },
            {
              scheduledAt: null,
            },
          ],
        },
      },
    });
  }
}
