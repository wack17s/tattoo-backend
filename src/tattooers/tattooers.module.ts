import { Module } from '@nestjs/common';

import { TattooersController } from './tattooers.controller';
import { TattooersService } from './tattooers.service';
import { FirestoreModule } from '../firestore/firestore.module';
import { InstagramModule } from 'src/instagram/instagram.module';

@Module({
  controllers: [TattooersController],
  providers: [TattooersService],
  imports: [FirestoreModule, InstagramModule]
})
export class TattooersModule {}
