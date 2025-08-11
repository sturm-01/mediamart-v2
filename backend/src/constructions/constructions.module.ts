import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstructionsController } from './constructions.controller';
import { ConstructionsService } from './constructions.service';
import { Construction } from './entities/construction.entity';
import { Photo } from './entities/photo.entity';
import { StatusHistory } from './entities/status-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Construction, Photo, StatusHistory])],
  controllers: [ConstructionsController],
  providers: [ConstructionsService],
  exports: [ConstructionsService],
})
export class ConstructionsModule {}