import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkSubtype, WorkSubtypeDocument } from './schemas/work-subtype.schema';
import { CreateWorkSubtypeDto } from './dtos/create-work-subtype.dto';
import { UpdateWorkSubtypeDto } from './dtos/update-work-subtype.dto';

@Injectable()
export class WorkSubtypeService {
  constructor(
    @InjectModel(WorkSubtype.name)
    private workSubtypeModel: Model<WorkSubtypeDocument>,
  ) {}

  async create(createWorkSubtypeDto: CreateWorkSubtypeDto): Promise<WorkSubtype> {
    const workSubtype = await this.workSubtypeModel.create(
      createWorkSubtypeDto,
    );
    return workSubtype.populate('parentWorkType');
  }

  async findAll(): Promise<WorkSubtype[]> {
    return await this.workSubtypeModel.find().populate('parentWorkType');
  }

  async findById(id: string): Promise<WorkSubtype> {
    const workSubtype = await this.workSubtypeModel
      .findById(id)
      .populate('parentWorkType');
    if (!workSubtype) {
      throw new NotFoundException(`WorkSubtype with ID ${id} not found`);
    }
    return workSubtype;
  }

  async update(
    id: string,
    updateWorkSubtypeDto: UpdateWorkSubtypeDto,
  ): Promise<WorkSubtype> {
    const workSubtype = await this.workSubtypeModel
      .findByIdAndUpdate(id, updateWorkSubtypeDto, {
        new: true,
        runValidators: true,
      })
      .populate('parentWorkType');

    if (!workSubtype) {
      throw new NotFoundException(`WorkSubtype with ID ${id} not found`);
    }
    return workSubtype;
  }

  async delete(id: string): Promise<WorkSubtype> {
    const workSubtype = await this.workSubtypeModel.findByIdAndDelete(id);
    if (!workSubtype) {
      throw new NotFoundException(`WorkSubtype with ID ${id} not found`);
    }
    return workSubtype;
  }
}
