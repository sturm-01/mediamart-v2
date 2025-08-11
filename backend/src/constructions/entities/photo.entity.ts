import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Construction } from './construction.entity';

@Entity('photos')
export class Photo {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ name: 'construction_id' })
  constructionId: string;

  @ApiProperty()
  @Column()
  url: string;

  @ApiProperty()
  @Column({ name: 'sort_index', default: 0 })
  sortIndex: number;

  @ManyToOne(() => Construction, (construction) => construction.photos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'construction_id' })
  construction: Construction;
}