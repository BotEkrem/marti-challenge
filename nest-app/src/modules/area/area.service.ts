import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from '@/src/entities/area.entity';
import { Repository } from 'typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateAreaDto } from '@/src/modules/area/dto/create-area.dto';
import { Coordinate } from '@/src/misc/classes/coordinate.class';
import { coordinates } from '@/src/modules/area/seed/data';
import { ClientProxy } from '@nestjs/microservices';
import { Distance } from '@/src/misc/classes/distance.interface';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    public areaRepository: Repository<Area>,
    @Inject('QUEUE_SERVICE_LOGGING')
    private readonly client: ClientProxy,
  ) {
    this.check();
  }

  async check() {
    const count = await this.areaRepository.count();

    if (count == 0) {
      for await (const area of coordinates) {
        await this.areaRepository.save(
          this.areaRepository.create({
            name: area.region,
            latitude: area.latitude,
            longitude: area.longitude,
            radius: 10,
          }),
        );
      }
    }
  }

  findAll(query: PaginateQuery) {
    return paginate(query, this.areaRepository, {
      sortableColumns: ['id', 'name', 'latitude', 'longitude'],
    });
  }

  async create(createAreaDto: CreateAreaDto) {
    const count = await this.areaRepository.count();

    const distance = await this.findClosest(count, {
      latitude: createAreaDto.latitude,
      longitude: createAreaDto.longitude,
    });

    if (distance.distance - createAreaDto.radius <= 0) {
      throw new BadRequestException('This area overlaps with another area.');
    }

    return this.areaRepository.save(
      this.areaRepository.create({
        latitude: createAreaDto.latitude,
        longitude: createAreaDto.longitude,
        radius: createAreaDto.radius,
        name: createAreaDto.name,
      }),
    );
  }

  async areaCheck(area) {
    const count = await this.areaRepository.count();
    const closest = await this.findClosest(count, area.locationDto);

    if (closest.distance <= 0) {
      await this.client.emit('areaLog', { ...closest, userId: area.user.id });
    }
  }

  public async findClosest(totalCount: number, currentLocation: Coordinate) {
    const range = 25;

    const searches = await Promise.all(
      [...Array(Math.ceil(totalCount / range))].map((_, index) =>
        this.findLowest(range, index, currentLocation),
      ),
    );
    const sortedArray = searches.sort((a, b) => a.distance - b.distance);
    return sortedArray[0];
  }

  public async findLowest(
    range: number,
    index: number,
    currentLocation: Coordinate,
  ): Promise<Distance> {
    return new Promise(async (resolve) => {
      const output = [];
      const areas = await this.areaRepository.find({
        skip: range * index,
        take: range,
      });

      for (const element of areas) {
        const distance = (
          this.haversineDistance(currentLocation, element) - element.radius
        ).toFixed(2);
        output.push({ region: element.name, distance, id: element.id });
      }

      const sortedArray = output.sort((a, b) => a.distance - b.distance);

      resolve(sortedArray[0]);
    });
  }

  public haversineDistance(cord1: Coordinate, cord2: Coordinate): number {
    const R = 6371;

    const toRad = (value: number) => (value * Math.PI) / 180;
    const dLat = toRad(cord2.latitude - cord1.latitude);
    const dLon = toRad(cord2.longitude - cord1.longitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(cord1.latitude)) *
        Math.cos(toRad(cord2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }
}
