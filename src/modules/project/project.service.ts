import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { ProjectStageTracker, ProjectStageTrackerDocument } from '../project-stage-tracker/schemas/project-stage-tracker.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)

    private projectModel: Model<ProjectDocument>,
    @InjectModel(ProjectStageTracker.name)
    private projectStageTrackerModel: Model<ProjectStageTrackerDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = await this.projectModel.create(createProjectDto);
    return project.populate([
      { path: 'panchayat', populate: { path: 'district' } },
      'department',
      'scheme',
      'contractorAgency',
      { path: 'workSubtype', populate: { path: 'parentWorkType' } },
      'projectStatus',
    ]);
  }

  async findAll(): Promise<Project[]> {
    const projects =await this.projectModel.find().populate([
      { path: 'panchayat', populate: { path: 'district' } },
      'department',
      'scheme',
      'contractorAgency',
      { path: 'workSubtype', populate: { path: 'parentWorkType' } },
      'projectStatus',
    ]);
    let projectWithStageTrackers : any[] = [];
  for( let project of projects){
    const projectStageTrackers = await this.projectStageTrackerModel.find({ projectId: project.id });
    projectWithStageTrackers.push({ ...project.toObject(), projectStageTrackers });
    console.log("projectWithStageTrackers", projectStageTrackers);
  }
    return projectWithStageTrackers;
  }


  async findById(id: string): Promise<Project> {
    const project = await this.projectModel
      .findById(id)
      .populate([
        { path: 'panchayat', populate: { path: 'district' } },
        'department',
        'scheme',
        'contractorAgency',
        { path: 'workSubtype', populate: { path: 'parentWorkType' } },
        'projectStatus',
      ]);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, {
        new: true,
        runValidators: true,
      })
      .populate([
        { path: 'panchayat', populate: { path: 'district' } },
        'department',
        'scheme',
        'contractorAgency',
        { path: 'workSubtype', populate: { path: 'parentWorkType' } },
        'projectStatus',
      ]);

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async delete(id: string): Promise<Project> {
    const project = await this.projectModel.findByIdAndDelete(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }
}
