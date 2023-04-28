import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ProfilesModule } from 'src/profiles/profiles.module';

@Module({
  providers: [],
  controllers: [RolesController],

  //список импортированных модулей, которые экспортируют провайдеров, требующихся в этом модуле
  imports: [ProfilesModule],

  //подмножество providers этого модуля, которое должно быть доступно в других модулях, импортирующих этот модуль
  exports: []
})
export class RolesModule {}
