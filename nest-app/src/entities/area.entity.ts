import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Log } from '@/src/entities/log.entity';

@Entity({ name: 'areas' })
export class Area {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', nullable: false })
  latitude: number;

  @Column({ type: 'decimal', nullable: false })
  longitude: number;

  @Column({ type: 'decimal', nullable: false, default: 30 })
  radius: number; // by KM

  @Column({ type: String, nullable: true })
  name: string;

  @OneToMany(() => Log, (log) => log.area)
  logs: Log[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
