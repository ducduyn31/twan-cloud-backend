import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from '@nestjs/config';
import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';
import {ValidationPipe} from '@nestjs/common';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./techqila.key'),
    cert: fs.readFileSync('./techqila.crt'),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  const configService: ConfigService = app.get(ConfigService);

  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: configService.get('FIREBASE_DATABASE_URL'),
  });

  fireorm.initialize(admin.firestore());

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }))

  app.enableCors({
    origin: '*'
  });

  await app.listen(3000);
}
bootstrap();
