import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike } from 'typeorm';
import { Construction, ConstructionStatus, ConstructionFormat } from './entities/construction.entity';
import { StatusHistory } from './entities/status-history.entity';
import { CreateConstructionDto } from './dto/create-construction.dto';
import { UpdateConstructionDto } from './dto/update-construction.dto';
import { QueryConstructionsDto } from './dto/query-constructions.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class ConstructionsService {
  constructor(
    @InjectRepository(Construction)
    private constructionsRepository: Repository<Construction>,
    @InjectRepository(StatusHistory)
    private statusHistoryRepository: Repository<StatusHistory>,
  ) {}

  async create(createConstructionDto: CreateConstructionDto): Promise<Construction> {
    const construction = this.constructionsRepository.create(createConstructionDto);
    return this.constructionsRepository.save(construction);
  }

  async findAll(query: QueryConstructionsDto) {
    const { format, status, city, q, page = 1, limit = 20 } = query;
    
    const queryBuilder = this.constructionsRepository
      .createQueryBuilder('construction')
      .leftJoinAndSelect('construction.photos', 'photos');

    // Apply filters
    if (format) {
      queryBuilder.andWhere('construction.format = :format', { format });
    }

    if (status) {
      queryBuilder.andWhere('construction.status = :status', { status });
    }

    if (city) {
      queryBuilder.andWhere('construction.city ILIKE :city', { city: `%${city}%` });
    }

    if (q) {
      queryBuilder.andWhere(
        '(construction.address ILIKE :search OR construction.externalId ILIKE :search)',
        { search: `%${q}%` }
      );
    }

    // Pagination
    const offset = (page - 1) * limit;
    queryBuilder.offset(offset).limit(limit);

    // Order by ID
    queryBuilder.orderBy('construction.externalId', 'ASC');

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Construction> {
    const construction = await this.constructionsRepository.findOne({
      where: { id },
      relations: ['photos', 'statusHistory'],
    });

    if (!construction) {
      throw new NotFoundException(`Construction with ID ${id} not found`);
    }

    return construction;
  }

  async update(id: string, updateConstructionDto: UpdateConstructionDto): Promise<Construction> {
    const construction = await this.findOne(id);
    Object.assign(construction, updateConstructionDto);
    return this.constructionsRepository.save(construction);
  }

  async updateStatus(
    id: string,
    updateStatusDto: UpdateStatusDto,
    userId?: string,
  ): Promise<Construction> {
    const construction = await this.findOne(id);
    const oldStatus = construction.status;

    // Update status
    construction.status = updateStatusDto.newStatus;
    const updatedConstruction = await this.constructionsRepository.save(construction);

    // Record status change in history
    const statusHistory = this.statusHistoryRepository.create({
      constructionId: id,
      userId,
      oldStatus,
      newStatus: updateStatusDto.newStatus,
      comment: updateStatusDto.comment,
    });

    await this.statusHistoryRepository.save(statusHistory);

    return updatedConstruction;
  }

  async remove(id: string): Promise<void> {
    const construction = await this.findOne(id);
    await this.constructionsRepository.remove(construction);
  }

  async bulkImport(constructionsData: CreateConstructionDto[]): Promise<{
    created: number;
    updated: number;
    errors: string[];
  }> {
    const results = { created: 0, updated: 0, errors: [] };

    for (const data of constructionsData) {
      try {
        if (data.externalId) {
          // Check if construction exists by external ID
          const existing = await this.constructionsRepository.findOne({
            where: { externalId: data.externalId },
          });

          if (existing) {
            // Update existing
            Object.assign(existing, data);
            await this.constructionsRepository.save(existing);
            results.updated++;
          } else {
            // Create new
            const construction = this.constructionsRepository.create(data);
            await this.constructionsRepository.save(construction);
            results.created++;
          }
        } else {
          // Create new without external ID
          const construction = this.constructionsRepository.create(data);
          await this.constructionsRepository.save(construction);
          results.created++;
        }
      } catch (error: any) {
        results.errors.push(`Error processing construction: ${error.message}`);
      }
    }

    return results;
  }

  async getStats() {
    const total = await this.constructionsRepository.count();
    const mediaboards = await this.constructionsRepository.count({
      where: { format: ConstructionFormat.MEDIABOARD },
    });
    const cityboards = await this.constructionsRepository.count({
      where: { format: ConstructionFormat.CITYBOARD },
    });
    const active = await this.constructionsRepository.count({
      where: { status: ConstructionStatus.ACTIVE },
    });

    return {
      total,
      mediaboards,
      cityboards,
      active,
    };
  }
}