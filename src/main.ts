import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();
let cachedApp;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Baster Nirman Backend API')
    .setDescription('Production-ready NestJS Backend with MongoDB')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  await app.init();
  return server;
}

// 👇 REQUIRED for Vercel
export default async function handler(req, res) {
  if (!cachedApp) {
    cachedApp = await bootstrap();
  }
  return cachedApp(req, res);
}
