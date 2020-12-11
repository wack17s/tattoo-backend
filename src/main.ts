import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const whitelist = ['https://www.instagram.com', 'https://tattoo-admin.herokuapp.com/'];

  app.use(cors({
    allowedHeaders: [
      'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Accept-Encoding', 'Connection',
      'X-Parse-Session-Token', 'X-Parse-Application-Id',
    ],
    credentials: true,
    methods: [ 'GET', 'PUT', 'POST', 'DELETE', 'OPTIONS' ],
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }));

  await app.listen(process.env.PORT || 3001);
}

bootstrap();
