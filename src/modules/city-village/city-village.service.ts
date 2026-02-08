import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CityVillage, CityVillageDocument } from './schemas/city-village.schema';
import { CreateCityVillageDto } from './dtos/create-city-village.dto';
import { UpdateCityVillageDto } from './dtos/update-city-village.dto';

@Injectable()
export class CityVillageService {
  constructor(
    @InjectModel(CityVillage.name)
    private cityVillageModel: Model<CityVillageDocument>,
  ) {}

  async create(createCityVillageDto: CreateCityVillageDto): Promise<CityVillage> {
    const cityVillage = await this.cityVillageModel.create(createCityVillageDto);
    return cityVillage;
  }

  async findAll(): Promise<CityVillage[]> {
    return await this.cityVillageModel.find();
  }

  async findById(id: string): Promise<CityVillage> {
    const cityVillage = await this.cityVillageModel.findById(id);
    if (!cityVillage) {
      throw new NotFoundException(`City/Village with ID ${id} not found`);
    }
    return cityVillage;
  }

  async update(
    id: string,
    updateCityVillageDto: UpdateCityVillageDto,
  ): Promise<CityVillage> {
    const cityVillage = await this.cityVillageModel.findByIdAndUpdate(
      id,
      updateCityVillageDto,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!cityVillage) {
      throw new NotFoundException(`City/Village with ID ${id} not found`);
    }
    return cityVillage;
  }

  async delete(id: string): Promise<CityVillage> {
    const cityVillage = await this.cityVillageModel.findByIdAndDelete(id);
    if (!cityVillage) {
      throw new NotFoundException(`City/Village with ID ${id} not found`);
    }
    return cityVillage;
  }
}
