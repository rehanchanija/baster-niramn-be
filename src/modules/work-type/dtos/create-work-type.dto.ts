import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkTypeDto {
  @ApiProperty({
    description: 'Work type name (unique, minimum 3 characters)',
    example: 'Road Construction',
    type: String,
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  workTypeName: string;
}
