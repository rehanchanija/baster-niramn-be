import { IsString, IsMongoId, IsNumber, IsBoolean, Min, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWorkStageTemplateDto {
  @ApiProperty({
    description: 'MongoDB ID of the Work Subtype',
    example: '507f1f77bcf86cd799439016',
    type: String,
  })
  @IsMongoId()
  workSubtypeId: string;

  @ApiProperty({
    description: 'Stage name',
    example: 'Foundation Preparation',
    type: String,
  })
  @IsString()
  stageName: string;

  @ApiProperty({
    description: 'Sequence number of the stage (starts from 1)',
    example: 1,
    type: Number,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  stageSequenceNumber: number;

  @ApiPropertyOptional({
    description: 'Whether this stage is mandatory',
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  isMandatory?: boolean;
}
