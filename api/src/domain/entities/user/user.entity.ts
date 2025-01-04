import { OmitType } from '@nestjs/mapped-types';
import { User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(user: Partial<UserEntity>) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.deletedAt = user.deletedAt;
  }
}

export const userSelectedField: Record<
  keyof Omit<UserEntity, 'password'>,
  boolean
> = {
  id: true,
  name: true,
  email: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
};

export class UserWithoutPasswordEntity extends OmitType(UserEntity, [
  'password',
]) {}

export type UserRequestEntity = Record<'user', UserEntity>;
