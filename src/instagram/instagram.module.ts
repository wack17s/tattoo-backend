import { Module, HttpModule } from '@nestjs/common';

import { InstagramService } from './instagram.service';

@Module({
  imports: [HttpModule],
  providers: [InstagramService],
  exports: [InstagramService]
})
export class InstagramModule {}
