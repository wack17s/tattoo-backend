import { Module } from '@nestjs/common';

import { TattooersController } from './tattooers.controller';
import { TattooersService } from './tattooers.service';

@Module({
  controllers: [TattooersController],
  providers: [TattooersService],
})
export class TattooersModule {}
