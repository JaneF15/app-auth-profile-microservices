import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RolesModule, 

    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
