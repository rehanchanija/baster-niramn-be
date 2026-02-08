import {
  IsString,
  IsMongoId,
  IsNumber,
  IsEnum,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { StageStatus } from '../schemas/project-stage-tracker.schema';

export class UpdateProjectStageTrackerDto {
  @ApiPropertyOptional({
    description: 'MongoDB ID of the Project',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  @IsOptional()
  projectId?: string;

  @ApiPropertyOptional({
    description: 'Name of the project stage',
    example: 'Design & Planning',
  })
  @IsString()
  @IsOptional()
  stageName?: string;

  @ApiPropertyOptional({
    description: 'Sequence number of this stage in the project',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  stageSequence?: number;

  @ApiPropertyOptional({
    description: 'Current status of the stage',
    example: StageStatus.IN_PROGRESS,
    enum: StageStatus,
  })
  @IsEnum(StageStatus)
  @IsOptional()
  stageStatus?: StageStatus;

  @ApiPropertyOptional({
    description: 'Completion date of the stage (ISO format)',
    example: '2025-06-30',
  })
  @IsDateString()
  @IsOptional()
  completionDate?: string;

  @ApiPropertyOptional({
    description: 'Additional remarks for this stage',
    example: 'Awaiting approval from department head',
  })
  @IsString()
  @IsOptional()
  remarks?: string;

  @ApiPropertyOptional({
    description: 'Project Status ID',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  @IsOptional()
  projectStatusId?: string;

  @ApiPropertyOptional({
    description: 'Review comments',
    example: 'Work is progressing well.',
  })
  @IsString()
  @IsOptional()
  review?: string;

  @ApiPropertyOptional({
    description: 'Date of update (ISO format)',
    example: '2025-06-30',
  })
  @IsDateString()
  @IsOptional()
  updateDate?: string;

  @ApiPropertyOptional({
    description: 'User who updated the stage',
    example: 'Admin User',
  })
  @IsString()
  @IsOptional()
  updateBy?: string;

  @ApiPropertyOptional({
    description: 'Array of Image URLs or paths',
    example: ['https://example.com/image1.jpg'],
    type: [String],
  })
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @ApiPropertyOptional({
    description: 'Geolocation coordinates',
    example: '28.6139, 77.2090',
  })
  @IsString()
  @IsOptional()
  geolocation?: string;
}
