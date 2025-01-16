import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { EventPattern } from '@nestjs/microservices';
import { Distance } from '@/src/misc/classes/distance.interface';
import { AuthGuard } from '@/src/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  Paginate,
  Paginated,
  PaginatedSwaggerDocs,
  PaginateQuery,
} from 'nestjs-paginate';
import { Log } from '@/src/entities/log.entity';
@Controller('logs')
export class LoggingController {
  constructor(private readonly loggingService: LoggingService) {}

  @EventPattern('areaLog')
  async areaLog(area: Distance) {
    return this.loggingService.areaLog(area);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @PaginatedSwaggerDocs(Log, {
    sortableColumns: ['id', 'area.id', 'date'],
  })
  public findAll(
    @Paginate() query: PaginateQuery,
    @Request() req,
  ): Promise<Paginated<Log>> {
    return this.loggingService.findAll(query, req.user.id);
  }
}
