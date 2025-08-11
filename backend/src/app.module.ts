import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ConstructionsModule } from './constructions/constructions.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';

import { Construction } from './constructions/entities/construction.entity';
import { Photo } from './constructions/entities/photo.entity';
import { StatusHistory } from './constructions/entities/status-history.entity';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL') || 'postgresql://postgres:postgres@localhost:5432/mediamart',
        entities: [Construction, Photo, StatusHistory, User],
        synchronize: true, // Set to false in production
        logging: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET') || 'supersecret',
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),
    ConstructionsModule,
    AuthModule,
    UsersModule,
    FilesModule,
  ],
})
export class AppModule {}