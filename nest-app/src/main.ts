import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('MARTI BACKEND TASK API')
    .addServer(('/' + configService.get('PREFIX')) || '/prefix')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://marti_user:marti_password@rabbitmq:5672'],
      queue: configService.get('QUEUE_NAME'),
      queueOptions: {
        durable: true,
      },
    },
  });

  SwaggerModule.setup('swagger', app, document);

  app.enableCors();
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'), '0.0.0.0');
}

bootstrap();
