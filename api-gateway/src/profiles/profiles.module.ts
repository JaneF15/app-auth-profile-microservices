import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { profile } from 'console';

@Module({
  controllers: [ProfilesController],

  //список импортированных модулей, которые экспортируют провайдеров, требующихся в этом модуле
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'secret',
      signOptions: {
        expiresIn: '24h'
      }
    }),
    ClientsModule.register([
      {
        name: 'PROFILE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${process.env.RABBITMQ_HOST}`],
          queue: 'profile-q',
          queueOptions: {
            durable: true,
          },
        }
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${process.env.RABBITMQ_HOST}`],
          queue: 'auth-q',
          queueOptions: {
            durable: true,
          },
        }
      }
    ])
  ],
  exports: [ClientsModule, JwtModule, ProfilesModule]
})
export class ProfilesModule {}