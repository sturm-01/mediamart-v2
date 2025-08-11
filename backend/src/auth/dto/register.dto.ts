import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '../../users/entities/user.entity';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;
}