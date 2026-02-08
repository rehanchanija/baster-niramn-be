import { IsString, IsMongoId, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateWorkSubtypeDto {
  @ApiPropertyOptional({
    description: 'Work subtype name',
    example: 'Bituminous Road',
  })
  @IsString()
  @IsOptional()
  workSubtypeName?: string;

  @ApiPropertyOptional({
    description: 'MongoDB ID of parent Work Type',
    example: '507f1f77bcf86cd799439015',
  })
  @IsMongoId()
  @IsOptional()
  parentWorkTypeId?: string;

  @ApiPropertyOptional({
    description: 'Default overall category',
    example: 'Civil Work',
  })
  @IsString()
  @IsOptional()
  defaultOverallCategory?: string;
}
