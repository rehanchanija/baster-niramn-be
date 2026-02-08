import { IsString, IsMongoId, IsNumber, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StageStatus } from '../schemas/project-stage-tracker.schema';

export class CreateProjectStageTrackerDto {
  @ApiProperty({
    description: 'MongoDB ID of the Project',
    example: '507f1f77bcf86cd799439011',
    type: String,
  })
  @IsMongoId()
  projectId: string;

  @ApiProperty({
    description: 'Name of the project stage',
    example: 'Design & Planning',
    type: String,
  })
  @IsString()
  stageName: string;

  @ApiProperty({
    description: 'Sequence number of this stage in the project',
    example: 1,
    type: Number,
  })
  @IsNumber()
  stageSequence: number;

  @ApiPropertyOptional({
    description: 'Current status of the stage',
    example: StageStatus.IN_PROGRESS,
    enum: StageStatus,
  })
  @IsEnum(StageStatus)
  @IsOptional()
  stageStatus?: StageStatus;

  @ApiPropertyOptional({
    description: 'Completion progress percentage (auto-calculated if not provided)',
    example: 33.33,
    type: Number,
    minimum: 0,
    maximum: 100,
  })
  @IsNumber()
  @IsOptional()
  completionProgress?: number;

  @ApiPropertyOptional({
    description: 'Completion date of the stage (ISO format)',
    example: '2025-06-30',
    type: String,
  })
  @IsDateString()
  @IsOptional()
  completionDate?: string;

  @ApiPropertyOptional({
    description: 'Additional remarks for this stage',
    example: 'Awaiting approval from department head',
    type: String,
  })
  @IsString()
  @IsOptional()
  remarks?: string;
}
