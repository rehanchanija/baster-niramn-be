import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDistrictDto {
  @ApiProperty({
    description: 'District name (unique)',
    example: 'Bastar',
    type: String,
  })
  @IsString()
  districtName: string;

  @ApiProperty({
    description: 'Status of the district',
    example: 'active',
    enum: ['active', 'inactive'],
    required: false,
  })
  @IsOptional()
  @IsEnum(['active', 'inactive'])
  status?: string;
}
