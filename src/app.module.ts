import { Module } from '@nestjs/common';

// import { AdminModule } from './admin/admin.module';
import { TattooersModule } from './tattooers/tattooers.module';

@Module({
  imports: [
    TattooersModule, // AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
