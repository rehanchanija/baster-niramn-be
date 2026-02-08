import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CityVillageService } from './city-village.service';
import { CityVillageController } from './city-village.controller';
import { CityVillage, CityVillageSchema } from './schemas/city-village.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CityVillage.name, schema: CityVillageSchema },
    ]),
  ],
  controllers: [CityVillageController],
  providers: [CityVillageService],
  exports: [CityVillageService],
})
export class CityVillageModule {}
