import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors({
    allowedHeaders: [
      'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Accept-Encoding', 'Connection',
      'X-Parse-Session-Token', 'X-Parse-Application-Id',
    ],
    credentials: true,
    methods: [ 'GET', 'PUT', 'POST', 'DELETE', 'OPTIONS' ],
    origin: (origin, callback) => {
      callback(null, true);
        return;
    }
  }));

  await app.listen(process.env.PORT || 3001);
}

bootstrap();
