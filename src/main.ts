import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from '@nestjs/config';
import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
