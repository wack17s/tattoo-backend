import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configService } from './config/config.service';

import { AuthModule } from './auth/auth.module';
// import { AdminModule } from './admin/admin.module';
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
    TattooerModule,
    CityModule,
    StyleModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
