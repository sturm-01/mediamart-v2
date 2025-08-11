import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConstructionsService } from './constructions/constructions.service';
import { UsersService } from './users/users.service';
import { UserRole } from './users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import * as fs from 'fs';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const constructionsService = app.get(ConstructionsService);
  const usersService = app.get(UsersService);

  try {
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await usersService.create({
      name: 'Admin User',
      email: 'admin@mediamart.kz',
      passwordHash: hashedPassword,
      role: UserRole.ADMIN,
    });
    console.log('✅ Admin user created');

    // Load and import constructions data
    const constructionsData = JSON.parse(fs.readFileSync('/tmp/constructions_import.json', 'utf8'));
    const results = await constructionsService.bulkImport(constructionsData);
    
    console.log('✅ Construction data imported:', results);
    
    // Get final stats
    const stats = await constructionsService.getStats();
    console.log('📊 Final statistics:', stats);

  } catch (error: any) {
    console.error('❌ Seeding failed:', error.message);
  } finally {
    await app.close();
  }
}

seed();