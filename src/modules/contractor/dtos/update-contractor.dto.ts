import { IsString, IsEmail, ValidateNested, IsMobilePhone, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateContactDetailsDto {
  @ApiPropertyOptional({
    description: 'Phone number in Indian format',
    example: '9876543210',
  })
  @IsString()
  @IsMobilePhone('en-IN')
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({
    description: 'Email address',
    example: 'contractor@example.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'Physical address',
    example: '123 Main Street, City, State 12345',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({
    description: 'City',
    example: 'Jagdalpur',
    type: String,
  })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({
    description: 'State',
    example: 'Chhattisgarh',
    type: String,
  })
  @IsString()
  @IsOptional()
  state?: string;
}

export class UpdateContractorDto {
  @ApiPropertyOptional({
    description: 'Contractor company/person name',
    example: 'XYZ Construction Co.',
  })
  @IsString()
  @IsOptional()
  contractorName?: string;

  @ApiPropertyOptional({
    description: 'Organization name of the contractor',
    example: 'Anil Trading Co.',
    type: String,
  })
  @IsString()
  @IsOptional()
  contractorOrganizationName?: string;

  

  @ApiPropertyOptional({
    description: 'Contact details',
    type: UpdateContactDetailsDto,
  })
  @ValidateNested()
  @Type(() => UpdateContactDetailsDto)
  @IsOptional()
  contactDetails?: UpdateContactDetailsDto;

  @ApiPropertyOptional({
    description: 'License number',
    example: 'LIC123456789',
    type: String,
  })
  @IsString()
  @IsOptional()
  licenseNo?: string;

  @ApiPropertyOptional({
    description: 'License image URL',
    example: 'https://example.com/license.jpg',
    type: String,
  })
  @IsString()
  @IsOptional()
  licenseImage?: string;

  @ApiPropertyOptional({
    description: 'GST number',
    example: '22AAAAA0000A1Z5',
    type: String,
  })
  @IsString()
  @IsOptional()
  gstNumber?: string;

  @ApiPropertyOptional({
    description: 'GST image URL',
    example: 'https://example.com/gst.jpg',
    type: String,
  })
  @IsString()
  @IsOptional()
  gstImage?: string;
}
