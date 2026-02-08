import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDepartmentDto {
  @ApiPropertyOptional({
    description: 'Department name (unique)',
    example: 'Public Works Department',
    type: String,
  })
  @IsString()
  @IsOptional()
  departmentName?: string;
}
