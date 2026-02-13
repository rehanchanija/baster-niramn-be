import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStateDto {
  @ApiProperty({
    description: 'Name of the state',
    example: 'Chhattisgarh',
  })
  @IsString()
  stateName: string;

  @ApiProperty({
    description: 'State code',
    example: 'CG',
    required: false,
  })
  @IsString()
  @IsOptional()
  stateCode?: string;
}
