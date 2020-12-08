import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configService } from './config/config.service';
// import { AdminModule } from './admin/admin.module';
import { CityModule } from './city/city.module';
import { City } from './model/city.entity';
import { Style } from './model/style.entity';
import { Tattooer } from './model/tattooer.entity';
import { StyleModule } from './style/style.module';
import { TattooerModule } from './tattooer/tattooer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...configService.getTypeOrmConfig(),
      entities: [Tattooer, City, Style],
    }),
    TattooerModule,
    CityModule,
    StyleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
