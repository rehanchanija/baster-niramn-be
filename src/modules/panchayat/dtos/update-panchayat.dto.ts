import { IsString, IsMobilePhone, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePanchayatDto {
  @ApiPropertyOptional({
    description: 'Panchayat name',
    example: 'Gram Panchayat A',
  })
  @IsString()
  @IsOptional()
  panchayatName?: string;

  @ApiPropertyOptional({
    description: 'District ID',
    example: '60d0fe4f5311236168a109ca',
  })
  @IsString()
  @IsOptional()
  districtId?: string;

  @ApiPropertyOptional({
    description: 'Zila Panchayat name',
    example: 'Zila Panchayat Y',
  })
  @IsString()
  @IsOptional()
  zilaPanchayatName?: string;

  @ApiPropertyOptional({
    description: 'Janpad Panchayat name',
    example: 'Janpad Panchayat Z',
  })
  @IsString()
  @IsOptional()
  janpadPanchayatName?: string;

  @ApiPropertyOptional({
    description: 'Block name',
    example: 'Block A',
  })
  @IsString()
  @IsOptional()
  blockName?: string;

  @ApiPropertyOptional({
    description: 'Sarpanch (Head) name',
    example: 'Rajesh Kumar',
  })
  @IsString()
  @IsOptional()
  sarpanchName?: string;

  @ApiPropertyOptional({
    description: 'Sarpanch contact number (Indian format)',
    example: '9876543210',
  })
  @IsString()
  @IsMobilePhone('en-IN')
  @IsOptional()
  sarpanchContact?: string;

  @ApiPropertyOptional({
    description: 'Panchayat Secretary name',
    example: 'Priya Singh',
  })
  @IsString()
  @IsOptional()
  panchayatSecretaryName?: string;

  @ApiPropertyOptional({
    description: 'Panchayat Secretary contact number (Indian format)',
    example: '9876543211',
  })
  @IsString()
  @IsMobilePhone('en-IN')
  @IsOptional()
  panchayatSecretaryContact?: string;
}
