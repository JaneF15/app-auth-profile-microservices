import { Module } from '@nestjs/common';
import { ProfilesModule } from './profiles/profiles.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ProfilesModule, 

    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
  ],
  controllers: [],
})
export class AppModule {}
