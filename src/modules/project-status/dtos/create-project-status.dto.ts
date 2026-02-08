import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectStatusDto {
  @ApiProperty({
    description: 'Project status name (unique)',
    example: 'Technical Stage',
    type: String,
  })
  @IsString()
  statusName: string;

  @ApiProperty({
    description: 'Status of the project status record',
    example: 'active',
    enum: ['active', 'inactive'],
    required: false,
  })
  @IsOptional()
  @IsEnum(['active', 'inactive'])
  status?: string;
}
