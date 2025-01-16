import { Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { LoggingController } from './logging.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from '@/src/entities/log.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  controllers: [LoggingController],
  providers: [LoggingService, JwtService],
})
export class LoggingModule {}
