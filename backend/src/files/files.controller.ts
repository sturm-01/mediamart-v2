import {
  Controller,
  Post,
  Get,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { Response } from 'express';
import { FilesService } from './files.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a file' })
  @ApiResponse({ status: 200, description: 'File uploaded successfully' })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const url = await this.filesService.uploadFile(file);
    return { url };
  }

  @Get('download/:format/:timestamp')
  @ApiOperation({ summary: 'Download constructions in specified format' })
  @ApiResponse({ status: 200, description: 'File download initiated' })
  async downloadFile(
    @Param('format') format: 'pdf' | 'ppt' | 'xls',
    @Param('timestamp') timestamp: string,
    @Query('ids') ids: string,
    @Res() res: Response,
  ) {
    // In a real implementation, you would:
    // 1. Fetch construction data by IDs
    // 2. Generate the requested file format
    // 3. Stream the file to the response

    const constructionIds = ids.split(',');
    const filename = `constructions_${timestamp}.${format}`;
    
    // Mock file content
    const content = `Construction data export\nIDs: ${constructionIds.join(', ')}\nFormat: ${format.toUpperCase()}\nGenerated: ${new Date().toISOString()}`;

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(content);
  }
}