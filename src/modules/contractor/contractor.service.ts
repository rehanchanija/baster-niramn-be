import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contractor, ContractorDocument } from './schemas/contractor.schema';
import { CreateContractorDto } from './dtos/create-contractor.dto';
import { UpdateContractorDto } from './dtos/update-contractor.dto';

@Injectable()
export class ContractorService {
  constructor(
    @InjectModel(Contractor.name)
    private contractorModel: Model<ContractorDocument>,
  ) {}

  async create(createContractorDto: CreateContractorDto): Promise<Contractor> {
    const contractor = await this.contractorModel.create(createContractorDto);
    return contractor;
  }

  async findAll(): Promise<Contractor[]> {
    return await this.contractorModel.find();
  }

  async findById(id: string): Promise<Contractor> {
    const contractor = await this.contractorModel.findById(id);
    if (!contractor) {
      throw new NotFoundException(`Contractor with ID ${id} not found`);
    }
    return contractor;
  }

  async update(
    id: string,
    updateContractorDto: UpdateContractorDto,
  ): Promise<Contractor> {
    const contractor = await this.contractorModel.findByIdAndUpdate(
      id,
      updateContractorDto,
      { new: true, runValidators: true },
    );

    if (!contractor) {
      throw new NotFoundException(`Contractor with ID ${id} not found`);
    }
    return contractor;
  }

  async delete(id: string): Promise<Contractor> {
    const contractor = await this.contractorModel.findByIdAndDelete(id);
    if (!contractor) {
      throw new NotFoundException(`Contractor with ID ${id} not found`);
    }
    return contractor;
  }
}
