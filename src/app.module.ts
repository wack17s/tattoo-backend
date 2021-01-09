import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { configService } from './config/config.service';

import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { CityModule } from './city/city.module';
import { TattooerModule } from './tattooer/tattooer.module';
import { StyleModule } from './style/style.module';

import { User } from './model/user.entity';
import { City } from './model/city.entity';
import { Style } from './model/style.entity';
import { Tattooer } from './model/tattooer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...configService.getTypeOrmConfig(),
      entities: [Tattooer, City, Style, User],
    }),
    ScheduleModule.forRoot(),
    TattooerModule,
    CityModule,
    StyleModule,
    AuthModule,
    TasksModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
