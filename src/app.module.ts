import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configService } from './config/config.service';
// import { AdminModule } from './admin/admin.module';
import { TattooerModule } from './tattooer/tattooer.module';
import { Tattooer } from './model/tattooer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...configService.getTypeOrmConfig(),
      entities: [Tattooer],
    }),
    TattooerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
