import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from '@nestjs/config';
import * as admin from 'firebase-admin';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: configService.get('FIREBASE_DATABASE_URL'),
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }))
  await app.listen(3000);
}
bootstrap();
