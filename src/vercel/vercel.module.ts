import { Module, HttpModule } from '@nestjs/common';

import { VercelService } from './vercel.service';

@Module({
  imports: [HttpModule],
  providers: [VercelService],
  exports: [VercelService]
})
export class VercelModule {}
