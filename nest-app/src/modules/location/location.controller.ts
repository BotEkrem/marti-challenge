import {
  Body,
  Controller,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@/src/guards/auth.guard';
import { LocationDto } from '@/src/modules/location/dto/location.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('locations')
export class LocationController {
  constructor(
    private readonly locationService: LocationService,

    @Inject('QUEUE_SERVICE_AREA')
    private readonly client: ClientProxy,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  public async location(@Body() locationDto: LocationDto, @Request() req) {
    await this.client.emit('areaCheck', { locationDto, user: req.user });
    return this.locationService.location(locationDto);
  }
}
