import { IsString, IsMongoId, IsOptional, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSchemeDto {
  @ApiProperty({
    description: 'Scheme name',
    example: 'PMAY - Pradhan Mantri Awas Yojana',
    type: String,
  })
  @IsString()
  schemeName: string;

  @ApiProperty({
    description: 'Source of funding',
    example: 'Government of India',
    type: String,
  })
  @IsString()
  fundingSource: string;

  @ApiPropertyOptional({
    description: 'MongoDB ID of the Department',
    example: '507f1f77bcf86cd799439012',
    type: String,
  })
  @IsMongoId()
  @IsOptional()
  departmentId?: string;

  @ApiProperty({
    description: 'Financial year in YYYY-YY format',
    example: '2024-25',
    type: String,
  })
  @IsString()
  @Matches(/^\d{4}-\d{2}$/, { message: 'Financial year must be in YYYY-YY format' })
  financialYear: string;

  @ApiPropertyOptional({
    description: 'Additional remarks',
    example: 'Ongoing scheme',
    type: String,
  })
  @IsString()
  @IsOptional()
  remarks?: string;
}
