import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Panchayat, PanchayatDocument } from './schemas/panchayat.schema';
import { CreatePanchayatDto } from './dtos/create-panchayat.dto';
import { UpdatePanchayatDto } from './dtos/update-panchayat.dto';

@Injectable()
export class PanchayatService {
  constructor(
    @InjectModel(Panchayat.name)
    private panchayatModel: Model<PanchayatDocument>,
  ) {}

  async create(createPanchayatDto: CreatePanchayatDto): Promise<Panchayat> {
    const panchayat = await this.panchayatModel.create(createPanchayatDto);
    return panchayat;
  }

  async findAll(): Promise<Panchayat[]> {
    return await this.panchayatModel
      .find()
      .populate(['district', 'cityVillage', 'block']);
  }

  async findById(id: string): Promise<Panchayat> {
    const panchayat = await this.panchayatModel
      .findById(id)
      .populate(['district', 'cityVillage', 'block']);
    if (!panchayat) {
      throw new NotFoundException(`Panchayat with ID ${id} not found`);
    }
    return panchayat;
  }

  async update(
    id: string,
    updatePanchayatDto: UpdatePanchayatDto,
  ): Promise<Panchayat> {
    const panchayat = await this.panchayatModel.findByIdAndUpdate(
      id,
      updatePanchayatDto,
      { new: true, runValidators: true },
    );

    if (!panchayat) {
      throw new NotFoundException(`Panchayat with ID ${id} not found`);
    }
    return panchayat;
  }

  async delete(id: string): Promise<Panchayat> {
    const panchayat = await this.panchayatModel.findByIdAndDelete(id);
    if (!panchayat) {
      throw new NotFoundException(`Panchayat with ID ${id} not found`);
    }
    return panchayat;
  }
}
