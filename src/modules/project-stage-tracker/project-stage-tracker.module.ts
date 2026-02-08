import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectStageTrackerService } from './project-stage-tracker.service';
import { ProjectStageTrackerController } from './project-stage-tracker.controller';
import { ProjectStageTracker, ProjectStageTrackerSchema } from './schemas/project-stage-tracker.schema';
import { ProjectModule } from '../project/project.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProjectStageTracker.name, schema: ProjectStageTrackerSchema },
    ]),
    ProjectModule,
  ],
  controllers: [ProjectStageTrackerController],
  providers: [ProjectStageTrackerService],
  exports: [ProjectStageTrackerService],
})
export class ProjectStageTrackerModule {}
