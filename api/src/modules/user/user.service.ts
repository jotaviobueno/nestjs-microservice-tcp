import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CLIENTS_ENUM,
  NOTIFICATION_CHANNEL_ENUM,
  NOTIFICATION_TEMPLATES_ENUM,
} from 'src/common/enums';
import {
  CreateNotificationDto,
  CreateUserDto,
  UpdateUserDto,
} from 'src/domain/dtos';
import {
  UserEntity,
  userSelectedField,
  UserWithoutPasswordEntity,
} from 'src/domain/entities';
import { PrismaService } from 'src/infrastructure/database/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(CLIENTS_ENUM.NOTIFICATION)
    private readonly notificationClient: ClientProxy,
  ) {}

  async create(createDto: CreateUserDto): Promise<UserWithoutPasswordEntity> {
    const emailAlreadyExists = await this.emailExists(createDto.email);

    if (emailAlreadyExists)
      throw new HttpException('Email already exists', HttpStatus.NOT_FOUND);

    const userData = new UserEntity(createDto);
    const user = await this.prismaService.user.create({
      data: userData,
      select: userSelectedField,
    });

    const notificationData = new CreateNotificationDto({
      channel: NOTIFICATION_CHANNEL_ENUM.EMAIL,
      to: user.email,
      context: user,
      template: NOTIFICATION_TEMPLATES_ENUM.USER_MAIL_CREATED,
    });
    this.notificationClient.emit('createNotification', notificationData);

    return user;
  }

  async findById(id: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id,
      },
      select: userSelectedField,
    });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async findAll() {
    const users = await this.prismaService.user.findMany({
      select: userSelectedField,
    });

    return users;
  }

  async update(updateDto: UpdateUserDto) {
    const user = await this.findById(updateDto.id);

    const userData = new UserEntity({
      ...user,
      ...updateDto,
    });

    const update = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: userData,
      select: userSelectedField,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    const notificationData = new CreateNotificationDto({
      channel: NOTIFICATION_CHANNEL_ENUM.EMAIL,
      to: user.email,
      context: user,
      template: NOTIFICATION_TEMPLATES_ENUM.USER_MAIL_UPDATED,
    });
    this.notificationClient.emit('createNotification', notificationData);

    return update;
  }

  async remove(id: string) {
    const user = await this.findById(id);

    const remove = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        deletedAt: new Date(),
      },
      select: userSelectedField,
    });

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    const notificationData = new CreateNotificationDto({
      channel: NOTIFICATION_CHANNEL_ENUM.EMAIL,
      to: user.email,
      context: user,
      template: NOTIFICATION_TEMPLATES_ENUM.USER_MAIL_DELETED,
    });
    this.notificationClient.emit('createNotification', notificationData);

    return remove;
  }

  private async emailExists(email: string) {
    const user = await this.prismaService.user.count({
      where: {
        email,
      },
    });

    return !!user;
  }
}
