import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { District, DistrictDocument } from './schemas/district.schema';
import { CreateDistrictDto } from './dtos/create-district.dto';
import { UpdateDistrictDto } from './dtos/update-district.dto';

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District.name)
    private districtModel: Model<DistrictDocument>,
  ) {}

  async create(createDistrictDto: CreateDistrictDto): Promise<District> {
    const district = await this.districtModel.create(createDistrictDto);
    return district;
  }

  async findAll(): Promise<District[]> {
    return await this.districtModel.find();
  }

  async findById(id: string): Promise<District> {
    const district = await this.districtModel.findById(id);
    if (!district) {
      throw new NotFoundException(`District with ID ${id} not found`);
    }
    return district;
  }

  async update(
    id: string,
    updateDistrictDto: UpdateDistrictDto,
  ): Promise<District> {
    const district = await this.districtModel.findByIdAndUpdate(
      id,
      updateDistrictDto,
      { new: true, runValidators: true },
    );

    if (!district) {
      throw new NotFoundException(`District with ID ${id} not found`);
    }
    return district;
  }

  async delete(id: string): Promise<District> {
    const district = await this.districtModel.findByIdAndDelete(id);
    if (!district) {
      throw new NotFoundException(`District with ID ${id} not found`);
    }
    return district;
  }
}
