import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Project, ProjectSchema } from '../project/schemas/project.schema';
import {
  Contractor,
  ContractorSchema,
} from '../contractor/schemas/contractor.schema';
import {
  ProjectStatus,
  ProjectStatusDocument,
  ProjectStatusSchema,
} from '../project-status/schemas/project-status.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Contractor.name, schema: ContractorSchema },
      { name: ProjectStatus.name, schema: ProjectStatusSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
