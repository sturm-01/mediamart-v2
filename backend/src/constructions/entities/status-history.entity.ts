import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Construction } from './construction.entity';
import { User } from '../../users/entities/user.entity';

@Entity('status_history')
export class StatusHistory {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ name: 'construction_id' })
  constructionId: string;

  @ApiProperty()
  @Column({ name: 'user_id', nullable: true })
  userId: string;

  @ApiProperty()
  @Column({ name: 'old_status', nullable: true })
  oldStatus: string;

  @ApiProperty()
  @Column({ name: 'new_status' })
  newStatus: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'changed_at' })
  changedAt: Date;

  @ApiProperty()
  @Column({ nullable: true })
  comment: string;

  @ManyToOne(() => Construction, (construction) => construction.statusHistory, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'construction_id' })
  construction: Construction;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}