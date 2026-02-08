import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project, ProjectSchema } from './schemas/project.schema';
import { PanchayatModule } from '../panchayat/panchayat.module';
import { DepartmentModule } from '../department/department.module';
import { SchemeModule } from '../scheme/scheme.module';
import { ContractorModule } from '../contractor/contractor.module';
import { WorkTypeModule } from '../work-type/work-type.module';
import { ProjectStageTrackerSchema } from '../project-stage-tracker/schemas/project-stage-tracker.schema';
import { ProjectStageTracker } from '../project-stage-tracker/schemas/project-stage-tracker.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema },{ name: ProjectStageTracker.name, schema: ProjectStageTrackerSchema }]),
    PanchayatModule,
    DepartmentModule,
    SchemeModule,
    ContractorModule,
    WorkTypeModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
