import { IsString, IsMongoId, IsNumber, IsEnum, IsDateString, IsOptional, Min, Max, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TimelineStatus } from '../schemas/project-progress-log.schema';

export class GeoLocationDto {
  @ApiPropertyOptional({
    description: 'Latitude coordinate',
    example: 28.6139,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiPropertyOptional({
    description: 'Longitude coordinate',
    example: 77.2090,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  longitude?: number;
}

export class CreateProjectProgressLogDto {
  @ApiProperty({
    description: 'MongoDB ID of the Project',
    example: '507f1f77bcf86cd799439011',
    type: String,
  })
  @IsMongoId()
  projectId: string;

  @ApiProperty({
    description: 'Current work stage',
    example: 'Foundation Work',
    type: String,
  })
  @IsMongoId()
  currentStageId: string;

  @ApiProperty({
    description: 'Previous overall progress percentage',
    example: 25,
    type: Number,
    minimum: 0,
    maximum: 100,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  previousOverallProgress: number;

  @ApiProperty({
    description: 'Updated overall progress percentage',
    example: 35,
    type: Number,
    minimum: 0,
    maximum: 100,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  updatedOverallProgress: number;

  @ApiProperty({
    description: 'Timeline status',
    example: TimelineStatus.ON_TRACK,
    enum: TimelineStatus,
  })
  @IsEnum(TimelineStatus)
  timelineStatus: TimelineStatus;

  @ApiProperty({
    description: 'Expected completion date (ISO format)',
    example: '2025-12-31',
    type: String,
  })
  @IsDateString()
  expectedCompletionDate: string;

  @ApiProperty({
    description: 'Work quality rating (1-5)',
    example: 4,
    type: Number,
    minimum: 1,
    maximum: 5,
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  workQualityRating: number;

  @ApiPropertyOptional({
    description: 'Field remarks from supervisor',
    example: 'Work proceeding as per schedule',
    type: String,
  })
  @IsString()
  @IsOptional()
  fieldRemarks?: string;

  @ApiPropertyOptional({
    description: 'Array of photo URLs',
    example: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  photoUpload?: string[];

  @ApiPropertyOptional({
    description: 'Geo location coordinates',
    type: GeoLocationDto,
  })
  @ValidateNested()
  @Type(() => GeoLocationDto)
  @IsOptional()
  geoLocation?: GeoLocationDto;
}
