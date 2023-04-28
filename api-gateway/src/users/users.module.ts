import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { RolesModule } from 'src/roles/roles.module';
import { UsersController } from './users.controller';
import { ProfilesModule } from 'src/profiles/profiles.module';



@Module({
  controllers: [UsersController],
  providers: [],

  //список импортированных модулей, которые экспортируют провайдеров, требующихся в этом модуле
  imports: [
    ProfilesModule
  ],

  //подмножество providers этого модуля, которое должно быть доступно в других модулях, импортирующих этот модуль
  exports: []
})
export class UsersModule {}
