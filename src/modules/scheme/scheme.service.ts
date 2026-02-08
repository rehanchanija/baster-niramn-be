import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Scheme, SchemeDocument } from './schemas/scheme.schema';
import { CreateSchemeDto } from './dtos/create-scheme.dto';
import { UpdateSchemeDto } from './dtos/update-scheme.dto';

@Injectable()
export class SchemeService {
  constructor(
    @InjectModel(Scheme.name)
    private schemeModel: Model<SchemeDocument>,
  ) {}

  async create(createSchemeDto: CreateSchemeDto): Promise<Scheme> {
    const scheme = await this.schemeModel.create(createSchemeDto);
    return scheme.populate('department');
  }

  async findAll(): Promise<Scheme[]> {
    return await this.schemeModel.find().populate('department');
  }

  async findById(id: string): Promise<Scheme> {
    const scheme = await this.schemeModel.findById(id).populate('department');
    if (!scheme) {
      throw new NotFoundException(`Scheme with ID ${id} not found`);
    }
    return scheme;
  }

  async update(id: string, updateSchemeDto: UpdateSchemeDto): Promise<Scheme> {
    const scheme = await this.schemeModel
      .findByIdAndUpdate(id, updateSchemeDto, {
        new: true,
        runValidators: true,
      })
      .populate('department');

    if (!scheme) {
      throw new NotFoundException(`Scheme with ID ${id} not found`);
    }
    return scheme;
  }

  async delete(id: string): Promise<Scheme> {
    const scheme = await this.schemeModel.findByIdAndDelete(id);
    if (!scheme) {
      throw new NotFoundException(`Scheme with ID ${id} not found`);
    }
    return scheme;
  }
}
