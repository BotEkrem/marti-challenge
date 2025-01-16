import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AreaService } from './area.service';
import { AuthGuard } from '@/src/guards/auth.guard';
import {
  Paginate,
  Paginated,
  PaginatedSwaggerDocs,
  PaginateQuery,
} from 'nestjs-paginate';
import { Area } from '@/src/entities/area.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateAreaDto } from '@/src/modules/area/dto/create-area.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller('areas')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @PaginatedSwaggerDocs(Area, {
    sortableColumns: ['id', 'name', 'latitude', 'longitude'],
  })
  public findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Area>> {
    return this.areaService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  public create(@Body() createAreaDto: CreateAreaDto): Promise<Area> {
    return this.areaService.create(createAreaDto);
  }

  @EventPattern('areaCheck')
  async areaCheck(area) {
    return this.areaService.areaCheck(area);
  }
}
