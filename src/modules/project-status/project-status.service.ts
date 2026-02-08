import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectStatus, ProjectStatusDocument } from './schemas/project-status.schema';
import { CreateProjectStatusDto } from './dtos/create-project-status.dto';
import { UpdateProjectStatusDto } from './dtos/update-project-status.dto';

@Injectable()
export class ProjectStatusService {
  constructor(
    @InjectModel(ProjectStatus.name)
    private projectStatusModel: Model<ProjectStatusDocument>,
  ) {}

  async create(createProjectStatusDto: CreateProjectStatusDto): Promise<ProjectStatus> {
    const projectStatus = await this.projectStatusModel.create(createProjectStatusDto);
    return projectStatus;
  }

  async findAll(): Promise<ProjectStatus[]> {
    return await this.projectStatusModel.find();
  }

  async findById(id: string): Promise<ProjectStatus> {
    const projectStatus = await this.projectStatusModel.findById(id);
    if (!projectStatus) {
      throw new NotFoundException(`Project Status with ID ${id} not found`);
    }
    return projectStatus;
  }

  async update(
    id: string,
    updateProjectStatusDto: UpdateProjectStatusDto,
  ): Promise<ProjectStatus> {
    const projectStatus = await this.projectStatusModel.findByIdAndUpdate(
      id,
      updateProjectStatusDto,
      { new: true, runValidators: true },
    );

    if (!projectStatus) {
      throw new NotFoundException(`Project Status with ID ${id} not found`);
    }
    return projectStatus;
  }

  async delete(id: string): Promise<ProjectStatus> {
    const projectStatus = await this.projectStatusModel.findByIdAndDelete(id);
    if (!projectStatus) {
      throw new NotFoundException(`Project Status with ID ${id} not found`);
    }
    return projectStatus;
  }
}
