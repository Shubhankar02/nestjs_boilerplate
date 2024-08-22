import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Register the email service globally
  // const emailServiceFactory = app.get(EmailServiceFactory);
  // emailServiceFactory.registerService('sendgrid', new SendGridEmailService());

  await app.listen(3000);
}

bootstrap();
