import { PartialType } from '@nestjs/swagger';
import { CreateCityVillageDto } from './create-city-village.dto';

export class UpdateCityVillageDto extends PartialType(CreateCityVillageDto) {}
