import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ConstructionStatus } from '../entities/construction.entity';

export class UpdateStatusDto {
  @ApiProperty({ enum: ConstructionStatus })
  @IsEnum(ConstructionStatus)
  newStatus: ConstructionStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  comment?: string;
}