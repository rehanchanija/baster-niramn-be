import { IsString, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlockDto {
  @ApiProperty({
    description: 'Name of the block',
    example: 'Bastar Block',
  })
  @IsString()
  blockName: string;

  @ApiProperty({
    description: 'State ID',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  stateId: string;
}
