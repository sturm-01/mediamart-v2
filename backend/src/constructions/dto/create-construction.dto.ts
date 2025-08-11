import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { ConstructionStatus, ConstructionFormat } from '../entities/construction.entity';

export class CreateConstructionDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  externalId?: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ enum: ConstructionFormat, required: false })
  @IsOptional()
  @IsEnum(ConstructionFormat)
  format?: ConstructionFormat;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ enum: ConstructionStatus, required: false })
  @IsOptional()
  @IsEnum(ConstructionStatus)
  status?: ConstructionStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  lat?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  lng?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  size?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  classification?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lighting?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  mrp?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  printRequirement?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  warehouse?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  side?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  orientation?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  dynamic?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  provider?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  number?: string;
}