import { IsString, IsMongoId, IsNumber, IsBoolean, Min, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateWorkStageTemplateDto {
  @ApiPropertyOptional({
    description: 'MongoDB ID of the Work Subtype',
    example: '507f1f77bcf86cd799439016',
  })
  @IsMongoId()
  @IsOptional()
  workSubtypeId?: string;

  @ApiPropertyOptional({
    description: 'Stage name',
    example: 'Foundation Preparation',
  })
  @IsString()
  @IsOptional()
  stageName?: string;

  @ApiPropertyOptional({
    description: 'Sequence number of the stage (starts from 1)',
    example: 1,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  stageSequenceNumber?: number;

  @ApiPropertyOptional({
    description: 'Whether this stage is mandatory',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isMandatory?: boolean;
}
