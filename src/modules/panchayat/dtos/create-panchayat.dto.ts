import { IsString, IsMobilePhone, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePanchayatDto {
  @ApiProperty({
    description: 'Panchayat name',
    example: 'Gram Panchayat A',
    type: String,
  })
  @IsString()
  panchayatName: string;

  @ApiProperty({
    description: 'District ID',
    example: '60d0fe4f5311236168a109ca',
    type: String,
  })
  @IsString()
  districtId: string;

  @ApiProperty({
    description: 'City/Village ID',
    example: '60d0fe4f5311236168a109cb',
    type: String,
  })
  @IsString()
  cityVillageId: string;

  @ApiPropertyOptional({
    description: 'Zila Panchayat name',
    example: 'Zila Panchayat Y',
    type: String,
  })
  @IsString()
  @IsOptional()
  zilaPanchayatName?: string;

  @ApiPropertyOptional({
    description: 'Janpad Panchayat name',
    example: 'Janpad Panchayat Z',
    type: String,
  })
  @IsString()
  @IsOptional()
  janpadPanchayatName?: string;

  @ApiPropertyOptional({
    description: 'Block ID',
    example: '60d0fe4f5311236168a109cc',
    type: String,
  })
  @IsString()
  @IsOptional()
  blockId?: string;

  @ApiProperty({
    description: 'Sarpanch (Head) name',
    example: 'Rajesh Kumar',
    type: String,
  })
  @IsString()
  sarpanchName: string;

  @ApiProperty({
    description: 'Sarpanch contact number (Indian format)',
    example: '9876543210',
    type: String,
  })
  @IsString()
  @IsMobilePhone('en-IN')
  sarpanchContact: string;

  @ApiProperty({
    description: 'Panchayat Secretary name',
    example: 'Priya Singh',
    type: String,
  })
  @IsString()
  panchayatSecretaryName: string;

  @ApiProperty({
    description: 'Panchayat Secretary contact number (Indian format)',
    example: '9876543211',
    type: String,
  })
  @IsString()
  @IsMobilePhone('en-IN')
  panchayatSecretaryContact: string;
}
