import { Module } from '@nestjs/common';

import { TattooersController } from './tattooers.controller';
import { TattooersService } from './tattooers.service';
import { FirestoreModule } from 'src/firestore/firestore.module';

@Module({
  controllers: [TattooersController],
  providers: [TattooersService],
  imports: [FirestoreModule]
})
export class TattooersModule {}
