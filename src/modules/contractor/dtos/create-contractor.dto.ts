import { IsString, IsEmail, ValidateNested, IsMobilePhone, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ContactDetailsDto {
  @ApiProperty({
    description: 'Phone number in Indian format',
    example: '9876543210',
    type: String,
  })
  @IsString()
  @IsMobilePhone('en-IN')
  phone: string;

  @ApiProperty({
    description: 'Email address',
    example: 'contractor@example.com',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Physical address',
    example: '123 Main Street, City, State 12345',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  address: string;

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

export class CreateContractorDto {
  @ApiProperty({
    description: 'Contractor company/person name',
    example: 'XYZ Construction Co.',
    type: String,
  })
  @IsString()
  contractorName: string;

  @ApiProperty({
    description: 'Organization name of the contractor',
    example: 'Anil Trading Co.',
    type: String,
  })
  @IsString()
  contractorOrganizationName: string;

 
  @ApiProperty({
    description: 'Contact details',
    type: ContactDetailsDto,
  })
  @ValidateNested()
  @Type(() => ContactDetailsDto)
  contactDetails: ContactDetailsDto;

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
