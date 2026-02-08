import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({
    description: 'Department name (unique)',
    example: 'Public Works Department',
    type: String,
  })
  @IsString()
  departmentName: string;
}
