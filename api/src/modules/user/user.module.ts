import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CLIENTS_ENUM } from 'src/common/enums';
import { environment } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CLIENTS_ENUM.NOTIFICATION,
        transport: Transport.TCP,
        options: {
          port: +environment.CLIENTS.NOTIFICATION.PORT,
          host: environment.CLIENTS.NOTIFICATION.URL,
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
