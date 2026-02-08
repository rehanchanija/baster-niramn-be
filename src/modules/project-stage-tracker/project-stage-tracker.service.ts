import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectStageTracker, ProjectStageTrackerDocument } from './schemas/project-stage-tracker.schema';
import { CreateProjectStageTrackerDto } from './dtos/create-project-stage-tracker.dto';
import { UpdateProjectStageTrackerDto } from './dtos/update-project-stage-tracker.dto';

@Injectable()
export class ProjectStageTrackerService {
  constructor(
    @InjectModel(ProjectStageTracker.name)
    private projectStageTrackerModel: Model<ProjectStageTrackerDocument>,
  ) {}

  async create(createProjectStageTrackerDto: CreateProjectStageTrackerDto): Promise<ProjectStageTracker> {
    // If completionProgress is not provided, we default to 0 or could implement equal distribution logic, 
    // but here we trust the manual input or default from schema.
    
    // Check if we need to validate total progress? 
    // For now, we assume the client validates the total breakdown.

    const projectStageTracker = await this.projectStageTrackerModel.create(
      createProjectStageTrackerDto,
    );
    return projectStageTracker.populate('project');
  }

  async findAll(): Promise<ProjectStageTracker[]> {
    return await this.projectStageTrackerModel.find().populate('project');
  }

  async findById(id: string): Promise<ProjectStageTracker> {
    const projectStageTracker = await this.projectStageTrackerModel
      .findById(id)
      .populate('project');
    if (!projectStageTracker) {
      throw new NotFoundException(`ProjectStageTracker with ID ${id} not found`);
    }
    return projectStageTracker;
  }

  async update(
    id: string,
    updateProjectStageTrackerDto: UpdateProjectStageTrackerDto,
  ): Promise<ProjectStageTracker> {
    const projectStageTracker = await this.projectStageTrackerModel
      .findByIdAndUpdate(id, updateProjectStageTrackerDto, {
        new: true,
        runValidators: true,
      })
      .populate('project');

    if (!projectStageTracker) {
      throw new NotFoundException(`ProjectStageTracker with ID ${id} not found`);
    }
    return projectStageTracker;
  }

  async findByProjectId(projectId: string): Promise<ProjectStageTracker[]> {
    return await this.projectStageTrackerModel
      .find({ projectId })
      .sort({ stageSequence: 1 })
      .populate('project');
  }

  async getProjectOverallCompletion(projectId: string): Promise<number> {
    const stages = await this.projectStageTrackerModel.find({ projectId });
    
    if (stages.length === 0) {
      return 0;
    }

    // Calculate overall completion based on weighted progress of COMPLETED stages
    const totalProgress = stages.reduce((acc, stage) => {
      if (stage.stageStatus === 'Completed') {
        return acc + (stage.completionProgress || 0);
      }
      return acc;
    }, 0);

    // If needed we can also partial credit for "In Progress" (e.g. 50% of the stage weight)
    // But for now strict completion is safer.

    return Math.min(Math.round(totalProgress * 100) / 100, 100);
  }

  async delete(id: string): Promise<ProjectStageTracker> {
    const projectStageTracker = await this.projectStageTrackerModel.findByIdAndDelete(id);
    if (!projectStageTracker) {
      throw new NotFoundException(`ProjectStageTracker with ID ${id} not found`);
    }
    return projectStageTracker;
  }
}
