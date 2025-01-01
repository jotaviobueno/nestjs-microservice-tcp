import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CLIENTS_ENUM } from 'src/common/enums';
import { CreateUserDto, UpdateUserDto } from 'src/domain/dtos';
import { UserEntity } from 'src/domain/entities';
import { PrismaService } from 'src/infrastructure/database/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(CLIENTS_ENUM.NOTIFICATION)
    private readonly notificationClient: ClientProxy,
  ) {}

  async create(createDto: CreateUserDto) {
    const emailAlreadyExists = await this.emailExists(createDto.email);

    if (emailAlreadyExists)
      throw new HttpException('Email already exists', HttpStatus.NOT_FOUND);

    const userData = new UserEntity(createDto);
    const user = await this.prismaService.user.create({
      data: userData,
    });

    this.notificationClient.emit('createNotification', user);

    return user;
  }

  async findById(id: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async findAll() {
    const users = await this.prismaService.user.findMany();

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
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    this.notificationClient.emit('createNotification', update);

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
    });

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    this.notificationClient.emit('createNotification', remove);

    return remove;
  }

  async emailExists(email: string) {
    const user = await this.prismaService.user.count({
      where: {
        email,
      },
    });

    return !!user;
  }
}
