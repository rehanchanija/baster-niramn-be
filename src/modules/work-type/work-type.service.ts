import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkType, WorkTypeDocument } from './schemas/work-type.schema';
import { CreateWorkTypeDto } from './dtos/create-work-type.dto';
import { UpdateWorkTypeDto } from './dtos/update-work-type.dto';

@Injectable()
export class WorkTypeService {
  constructor(
    @InjectModel(WorkType.name)
    private workTypeModel: Model<WorkTypeDocument>,
  ) {}

  async create(createWorkTypeDto: CreateWorkTypeDto): Promise<WorkType> {
    const workType = await this.workTypeModel.create(createWorkTypeDto);
    return workType;
  }

  async findAll(): Promise<WorkType[]> {
    return await this.workTypeModel.find();
  }

  async findById(id: string): Promise<WorkType> {
    const workType = await this.workTypeModel.findById(id);
    if (!workType) {
      throw new NotFoundException(`WorkType with ID ${id} not found`);
    }
    return workType;
  }

  async update(
    id: string,
    updateWorkTypeDto: UpdateWorkTypeDto,
  ): Promise<WorkType> {
    const workType = await this.workTypeModel.findByIdAndUpdate(
      id,
      updateWorkTypeDto,
      { new: true, runValidators: true },
    );

    if (!workType) {
      throw new NotFoundException(`WorkType with ID ${id} not found`);
    }
    return workType;
  }

  async delete(id: string): Promise<WorkType> {
    const workType = await this.workTypeModel.findByIdAndDelete(id);
    if (!workType) {
      throw new NotFoundException(`WorkType with ID ${id} not found`);
    }
    return workType;
  }
}
