import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CLIENTS_ENUM } from 'src/common/enums';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CLIENTS_ENUM.NOTIFICATION,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
