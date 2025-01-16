import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'QUEUE_SERVICE_AREA',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://marti_user:marti_password@rabbitmq:5672'],
          queue: 'area_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [LocationController],
  providers: [LocationService, JwtService],
})
export class LocationModule {}
