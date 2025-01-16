import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from '@/src/entities/area.entity';
import { JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Area]),
    ClientsModule.register([
      {
        name: 'QUEUE_SERVICE_LOGGING',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://marti_user:marti_password@rabbitmq:5672'],
          queue: 'logging_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [AreaController],
  providers: [AreaService, JwtService],
})
export class AreaModule {}
