import { Module } from '@nestjs/common';

import { instagramFactory } from './instagram.provider';

@Module({
  providers: [instagramFactory],
  exports: [instagramFactory]
})
export class InstagramModule {}
