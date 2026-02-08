import { IsString, MinLength, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateWorkTypeDto {
  @ApiPropertyOptional({
    description: 'Work type name (unique, minimum 3 characters)',
    example: 'Road Construction',
    type: String,
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  @IsOptional()
  workTypeName?: string;
}
