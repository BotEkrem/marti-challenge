import { Injectable } from '@nestjs/common';
import { LocationDto } from '@/src/modules/location/dto/location.dto';

@Injectable()
export class LocationService {
  constructor() {}

  location(locationDto: LocationDto) {
    return locationDto;
  }
}
