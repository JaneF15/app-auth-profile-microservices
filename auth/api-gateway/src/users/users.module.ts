import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { RolesModule } from 'src/roles/roles.module';
import { UsersController } from './users.controller';



@Module({
  controllers: [UsersController],
  providers: [],

  //список импортированных модулей, которые экспортируют провайдеров, требующихся в этом модуле
  imports: [
    AuthModule
  ],

  //подмножество providers этого модуля, которое должно быть доступно в других модулях, импортирующих этот модуль
  exports: []
})
export class UsersModule {}
