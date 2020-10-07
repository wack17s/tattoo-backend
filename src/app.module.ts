import { Module } from '@nestjs/common';

import { TattooersModule } from './tattooers/tattooers.module';
import { HomeModule } from './home/home.module';
import { AboutController } from './about/about.controller';
import { AboutService } from './about/about.service';

@Module({
  imports: [HomeModule, TattooersModule],
  controllers: [AboutController],
  providers: [AboutService],
})
export class AppModule {}
