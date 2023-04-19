import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProfilesModule } from './profiles/profiles.module';
import { Profile } from "./profiles/profiles.model";

@Module({
  controllers: [],
  providers: [],

  //список импортированных модулей, которые экспортируют провайдеров, требующихся в этом модуле
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Profile],
      autoLoadModels: true,
    }),
    ProfilesModule,
    ]
})
export class AppModule {};
