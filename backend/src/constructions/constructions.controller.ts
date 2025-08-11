import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { ConstructionsService } from './constructions.service';
import { CreateConstructionDto } from './dto/create-construction.dto';
import { UpdateConstructionDto } from './dto/update-construction.dto';
import { QueryConstructionsDto } from './dto/query-constructions.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import * as XLSX from 'xlsx';

@ApiTags('constructions')
@Controller('constructions')
export class ConstructionsController {
  constructor(private readonly constructionsService: ConstructionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all constructions with filters' })
  @ApiResponse({ status: 200, description: 'Returns filtered constructions' })
  findAll(@Query() query: QueryConstructionsDto) {
    return this.constructionsService.findAll(query);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get construction statistics' })
  @ApiResponse({ status: 200, description: 'Returns statistics' })
  getStats() {
    return this.constructionsService.getStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get construction by ID' })
  @ApiResponse({ status: 200, description: 'Returns construction details' })
  @ApiResponse({ status: 404, description: 'Construction not found' })
  findOne(@Param('id') id: string) {
    return this.constructionsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new construction' })
  @ApiResponse({ status: 201, description: 'Construction created successfully' })
  create(@Body() createConstructionDto: CreateConstructionDto) {
    return this.constructionsService.create(createConstructionDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update construction' })
  @ApiResponse({ status: 200, description: 'Construction updated successfully' })
  update(@Param('id') id: string, @Body() updateConstructionDto: UpdateConstructionDto) {
    return this.constructionsService.update(id, updateConstructionDto);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update construction status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
    @Request() req,
  ) {
    return this.constructionsService.updateStatus(id, updateStatusDto, req.user?.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete construction' })
  @ApiResponse({ status: 200, description: 'Construction deleted successfully' })
  remove(@Param('id') id: string) {
    return this.constructionsService.remove(id);
  }

  @Post('upload-excel')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload Excel file with constructions' })
  @ApiResponse({ status: 200, description: 'Excel file processed successfully' })
  async uploadExcel(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    try {
      // Parse Excel file
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Convert Excel data to CreateConstructionDto format
      const constructionsData: CreateConstructionDto[] = jsonData.map((row: any) => {
        const coordinates = row['Координаты'] || row['coordinates'];
        let lat: number | undefined;
        let lng: number | undefined;

        if (coordinates && coordinates !== 'nan' && typeof coordinates === 'string') {
          const [latStr, lngStr] = coordinates.split(',');
          lat = parseFloat(latStr?.trim());
          lng = parseFloat(lngStr?.trim());
          if (isNaN(lat) || isNaN(lng)) {
            lat = undefined;
            lng = undefined;
          }
        }

        return {
          externalId: row['ID']?.toString() || row['id']?.toString(),
          address: row['Наименование конструкции (адрес)'] || row['title'] || row['address'],
          city: row['Локация (Категория)'] || row['category'] || row['city'],
          format: row['Формат'] || row['format'],
          size: row['Размер'] || row['size'],
          classification: row['Класс'] || row['classification'],
          lighting: row['Освещение'] || row['lighting'],
          category: row['Локация (Категория)'] || row['category'],
          mrp: row['Кол-во МРП']?.toString() || row['mrp'],
          printRequirement: row['Требования к печати'] || row['printRequirement'],
          warehouse: row['Склад'] || row['warehouse'],
          side: row['Сторона'] || row['side'],
          orientation: row['Направление'] || row['orientation'],
          dynamic: row['Динамика'] || row['dynamic'],
          provider: row['Владелец конструкции'] || row['provider'],
          number: row['Номер конструкции']?.toString() || row['number'],
          lat,
          lng,
        };
      });

      // Import to database
      const results = await this.constructionsService.bulkImport(constructionsData);

      return {
        message: 'Excel file processed successfully',
        ...results,
        totalProcessed: constructionsData.length,
      };
    } catch (error) {
      throw new Error(`Failed to process Excel file: ${error.message}`);
    }
  }
}