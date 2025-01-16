import { Injectable } from '@nestjs/common';
import { Distance } from '@/src/misc/classes/distance.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from '@/src/entities/log.entity';
import { FindOneOptions, Repository } from 'typeorm';
import {
  FilterOperator,
  FilterSuffix,
  paginate,
  PaginateQuery,
} from 'nestjs-paginate';

@Injectable()
export class LoggingService {
  constructor(
    @InjectRepository(Log)
    public logRepository: Repository<Log>,
  ) {}
  async areaLog(area: Distance) {
    const lastRecord = await this.logRepository.findOne({
      order: { id: 'DESC' },
      where: { user: { id: area.userId } },
      relations: ['area'],
    } as FindOneOptions<Log>);

    if (lastRecord && lastRecord.area.id == area.id) {
      return console.log(`${area.userId} ID User still in the same area.`);
    }

    await this.logRepository.save(
      this.logRepository.create({
        area: { id: area.id },
        user: { id: area.userId },
        date: new Date(),
      }),
    );

    return console.log(area);
  }

  async findAll(query: PaginateQuery, userId: number) {
    query.filter = { ...query.filter, 'user.id': `$eq:${userId}` };
    const pagination = await paginate(query, this.logRepository, {
      sortableColumns: ['id', 'date', 'area.id'],
      filterableColumns: { 'user.id': [FilterOperator.EQ, FilterSuffix.NOT] },
      relations: ['area', 'user'],
    });

    pagination.data = pagination.data.map((v) => {
      delete v.user.password;
      return v;
    });
    return pagination;
  }
}
