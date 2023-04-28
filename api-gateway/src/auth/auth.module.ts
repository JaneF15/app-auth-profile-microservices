import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { ProfilesModule } from 'src/profiles/profiles.module';

@Module({
  controllers: [AuthController],

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
    ProfilesModule
    // ClientsModule.register([
    //   {
    //     name: 'AUTH_SERVICE',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: [`amqp://${process.env.RABBITMQ_HOST}`],
    //       queue: 'auth-q',
    //       queueOptions: {
    //         durable: true,
    //       },
    //     }
    //   }
    // ])
  ],
  exports: [JwtModule, AuthModule]
})
export class AuthModule {}
