import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectStatusService } from './project-status.service';
import { ProjectStatusController } from './project-status.controller';
import { ProjectStatus, ProjectStatusSchema } from './schemas/project-status.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProjectStatus.name, schema: ProjectStatusSchema },
    ]),
  ],
  controllers: [ProjectStatusController],
  providers: [ProjectStatusService],
  exports: [ProjectStatusService],
})
export class ProjectStatusModule {}
