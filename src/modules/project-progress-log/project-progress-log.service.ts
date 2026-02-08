import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectProgressLog, ProjectProgressLogDocument } from './schemas/project-progress-log.schema';
import { CreateProjectProgressLogDto } from './dtos/create-project-progress-log.dto';

@Injectable()
export class ProjectProgressLogService {
  constructor(
    @InjectModel(ProjectProgressLog.name)
    private projectProgressLogModel: Model<ProjectProgressLogDocument>,
  ) {}

  async create(createProjectProgressLogDto: CreateProjectProgressLogDto): Promise<ProjectProgressLog> {
    const projectProgressLog = await this.projectProgressLogModel.create(
      createProjectProgressLogDto,
    );
    return projectProgressLog.populate('project');
  }

  async findAll(): Promise<ProjectProgressLog[]> {
    return await this.projectProgressLogModel.find().populate('project');
  }

  async findById(id: string): Promise<ProjectProgressLog> {
    const projectProgressLog = await this.projectProgressLogModel
      .findById(id)
      .populate('project');
    if (!projectProgressLog) {
      throw new NotFoundException(`ProjectProgressLog with ID ${id} not found`);
    }
    return projectProgressLog;
  }

  async findByProjectId(projectId: string): Promise<ProjectProgressLog[]> {
    return await this.projectProgressLogModel
      .find({ projectId })
      .populate('project')
      .populate('currentStage')
      .sort({ createdAt: -1 });
  }

  async update(): Promise<void> {
    throw new BadRequestException('ProjectProgressLog is immutable and cannot be updated');
  }

  async delete(): Promise<void> {
    throw new BadRequestException('ProjectProgressLog is immutable and cannot be deleted');
  }
}
