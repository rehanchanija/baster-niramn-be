import { IsString, IsMongoId, IsNumber, Min, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Name of the work/project',
    example: 'Road Construction Project',
    type: String,
  })
  @IsString()
  nameOfWork: string;

  @ApiProperty({
    description: 'MongoDB ID of the Panchayat',
    example: '507f1f77bcf86cd799439011',
    type: String,
  })
  @IsMongoId()
  panchayatId: string;

  @ApiProperty({
    description: 'MongoDB ID of the Department',
    example: '507f1f77bcf86cd799439012',
    type: String,
  })
  @IsMongoId()
  departmentId: string;

  @ApiProperty({
    description: 'MongoDB ID of the Scheme',
    example: '507f1f77bcf86cd799439013',
    type: String,
  })
  @IsMongoId()
  schemeId: string;

  @ApiProperty({
    description: 'Source of funds',
    example: 'Government Grant',
    type: String,
  })
  @IsString()
  fundSource: string;

  @ApiProperty({
    description: 'Sanctioned amount in rupees',
    example: 500000,
    type: Number,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  sanctionedAmount: number;

  @ApiProperty({
    description: 'Project start date',
    example: '2024-01-24T10:00:00.000Z',
    type: String,
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'Project end date',
    example: '2025-01-24T10:00:00.000Z',
    type: String,
  })
  @IsDateString()
  endDate: string;

  @ApiProperty({
    description: 'Tender date',
    example: '2024-02-15T10:00:00.000Z',
    type: String,
  })
  @IsDateString()
  tenderDate: string;

  @ApiProperty({
    description: 'MongoDB ID of the Project Status',
    example: '507f1f77bcf86cd799439020',
    type: String,
  })
  @IsMongoId()
  projectStatusId: string;

  @ApiProperty({
    description: 'MongoDB ID of the Contractor/Agency',
    example: '507f1f77bcf86cd799439014',
    type: String,
  })
  @IsMongoId()
  @IsOptional()
  contractorAgencyId: string;

  @ApiProperty({
    description: 'MongoDB ID of the Work Subtype',
    example: '507f1f77bcf86cd799439015',
    type: String,
  })
  @IsMongoId()
  workSubtypeId: string;

  @ApiProperty({
    description: 'Location of the work',
    example: 'Main Market Area',
    type: String,
  })
  @IsString()
  workLocation: string;

  @ApiPropertyOptional({
    description: 'Image URL of the site before starting work',
    example: 'https://example.com/image-before.jpg',
    type: String,
  })
  @IsString()
  @IsOptional()
  uploadImageBefore?: string;

  @ApiPropertyOptional({
    description: 'Work order date',
    example: '2024-02-01T10:00:00.000Z',
    type: String,
  })
  @IsDateString()
  @IsOptional()
  workOrderDate?: string;

  @ApiPropertyOptional({
    description: 'Work order number',
    example: 'WO/2024/001',
    type: String,
  })
  @IsString()
  @IsOptional()
  workOrderNo?: string;

  @ApiPropertyOptional({
    description: 'Work order amount',
    example: 450000,
    type: Number,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  workOrderAmount?: number;

  @ApiPropertyOptional({
    description: 'Estimated project completion date',
    example: '2025-10-01T10:00:00.000Z',
    type: String,
  })
  @IsDateString()
  @IsOptional()
  estimatedDate?: string;
}
