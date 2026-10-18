import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { existsSync, unlinkSync } from 'fs';
import { AppService } from './app.service.js';

async function bootstrap() {
  const dbFile = 'db.sqlite'
  if (existsSync(dbFile)) unlinkSync(dbFile)

  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    })
  )

  app.enableCors({
    origin: (process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173').split(','),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  const appservice = app.get(AppService)
  await appservice.seed()

  await app.listen(process.env.PORT ?? 3000);
}

await bootstrap();
