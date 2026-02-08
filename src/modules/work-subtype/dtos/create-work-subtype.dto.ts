import { IsString, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkSubtypeDto {
  @ApiProperty({
    description: 'Work subtype name',
    example: 'Bituminous Road',
    type: String,
  })
  @IsString()
  workSubtypeName: string;

  @ApiProperty({
    description: 'MongoDB ID of parent Work Type',
    example: '507f1f77bcf86cd799439015',
    type: String,
  })
  @IsMongoId()
  parentWorkTypeId: string;

  @ApiProperty({
    description: 'Default overall category',
    example: 'Civil Work',
    type: String,
  })
  @IsString()
  defaultOverallCategory: string;
}
