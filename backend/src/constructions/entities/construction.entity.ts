import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Photo } from './photo.entity';
import { StatusHistory } from './status-history.entity';

export enum ConstructionStatus {
  ACTIVE = 'Active',
  IN_PROGRESS = 'InProgress',
  DECOMMISSIONED = 'Decommissioned',
}

export enum ConstructionFormat {
  MEDIABOARD = 'Медиаборд',
  CITYBOARD = 'Ситиборд',
}

@Entity('constructions')
export class Construction {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ name: 'external_id', nullable: true })
  externalId: string;

  @ApiProperty()
  @Column()
  address: string;

  @ApiProperty()
  @Column({ nullable: true })
  city: string;

  @ApiProperty({ enum: ConstructionFormat })
  @Column({
    type: 'enum',
    enum: ConstructionFormat,
    nullable: true,
  })
  format: ConstructionFormat;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  price: number;

  @ApiProperty({ enum: ConstructionStatus })
  @Column({
    type: 'enum',
    enum: ConstructionStatus,
    default: ConstructionStatus.ACTIVE,
  })
  status: ConstructionStatus;

  @ApiProperty()
  @Column({ type: 'double precision', nullable: true })
  lat: number;

  @ApiProperty()
  @Column({ type: 'double precision', nullable: true })
  lng: number;

  @ApiProperty()
  @Column({ nullable: true })
  size: string;

  @ApiProperty()
  @Column({ nullable: true })
  classification: string;

  @ApiProperty()
  @Column({ nullable: true })
  lighting: string;

  @ApiProperty()
  @Column({ nullable: true })
  category: string;

  @ApiProperty()
  @Column({ nullable: true })
  mrp: string;

  @ApiProperty()
  @Column({ name: 'print_requirement', type: 'text', nullable: true })
  printRequirement: string;

  @ApiProperty()
  @Column({ nullable: true })
  warehouse: string;

  @ApiProperty()
  @Column({ nullable: true })
  side: string;

  @ApiProperty()
  @Column({ nullable: true })
  orientation: string;

  @ApiProperty()
  @Column({ nullable: true })
  dynamic: string;

  @ApiProperty()
  @Column({ nullable: true })
  provider: string;

  @ApiProperty()
  @Column({ nullable: true })
  number: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Photo, (photo) => photo.construction, { cascade: true })
  photos: Photo[];

  @OneToMany(() => StatusHistory, (history) => history.construction)
  statusHistory: StatusHistory[];
}