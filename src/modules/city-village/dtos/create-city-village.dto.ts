import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';

export class CreateCityVillageDto {
  @ApiProperty({
    description: 'Name of the city or village',
    example: 'Jagdalpur',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Type of location',
    enum: ['City', 'Village'],
    example: 'City',
  })
  @IsNotEmpty()
  @IsEnum(['City', 'Village'])
  type: string;

  @ApiProperty({
    description: 'Pincode of the location',
    example: '494001',
    required: false,
  })
  @IsOptional()
  @IsString()
  pincode?: string;
}
