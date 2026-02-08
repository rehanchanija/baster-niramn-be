import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkStageTemplate, WorkStageTemplateDocument } from './schemas/work-stage-template.schema';
import { CreateWorkStageTemplateDto } from './dtos/create-work-stage-template.dto';
import { UpdateWorkStageTemplateDto } from './dtos/update-work-stage-template.dto';

@Injectable()
export class WorkStageTemplateService {
  constructor(
    @InjectModel(WorkStageTemplate.name)
    private workStageTemplateModel: Model<WorkStageTemplateDocument>,
  ) {}

  async create(createWorkStageTemplateDto: CreateWorkStageTemplateDto): Promise<WorkStageTemplate> {
    const workStageTemplate = await this.workStageTemplateModel.create(
      createWorkStageTemplateDto,
    );
    return workStageTemplate.populate('workSubtype');
  }

  async findAll(): Promise<WorkStageTemplate[]> {
    return await this.workStageTemplateModel.find().populate('workSubtype');
  }

  async findById(id: string): Promise<WorkStageTemplate> {
    const workStageTemplate = await this.workStageTemplateModel
      .findById(id)
      .populate('workSubtype');
    if (!workStageTemplate) {
      throw new NotFoundException(`WorkStageTemplate with ID ${id} not found`);
    }
    return workStageTemplate;
  }

  async update(
    id: string,
    updateWorkStageTemplateDto: UpdateWorkStageTemplateDto,
  ): Promise<WorkStageTemplate> {
    const workStageTemplate = await this.workStageTemplateModel
      .findByIdAndUpdate(id, updateWorkStageTemplateDto, {
        new: true,
        runValidators: true,
      })
      .populate('workSubtype');

    if (!workStageTemplate) {
      throw new NotFoundException(`WorkStageTemplate with ID ${id} not found`);
    }
    return workStageTemplate;
  }

  async delete(id: string): Promise<WorkStageTemplate> {
    const workStageTemplate = await this.workStageTemplateModel.findByIdAndDelete(id);
    if (!workStageTemplate) {
      throw new NotFoundException(`WorkStageTemplate with ID ${id} not found`);
    }
    return workStageTemplate;
  }
}
