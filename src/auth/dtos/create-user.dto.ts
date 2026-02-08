import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../schemas/user.schema';

export class CreateUserDto {
  @ApiProperty({
    description: 'User full name (minimum 3 characters)',
    example: 'John Doe',
    type: String,
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password (minimum 8 characters)',
    example: 'Password123',
    type: String,
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'User role',
    example: UserRole.VIEWER,
    enum: UserRole,
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    description: 'User contact number',
    example: '1234567890',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  contactNumber?: string;

  @ApiProperty({
    description: 'User address',
    example: '123 Main St, City',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;
}
