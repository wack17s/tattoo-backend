import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const whitelist = ['https://tattoo-admin.herokuapp.com', 'https://mytattoo.com.ua'];
  app.use(cors());

  await app.listen(process.env.PORT || 3001);
}

bootstrap();
