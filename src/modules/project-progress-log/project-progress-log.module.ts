import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectProgressLogService } from './project-progress-log.service';
import { ProjectProgressLogController } from './project-progress-log.controller';
import { ProjectProgressLog, ProjectProgressLogSchema } from './schemas/project-progress-log.schema';
import { ProjectModule } from '../project/project.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProjectProgressLog.name, schema: ProjectProgressLogSchema },
    ]),
    ProjectModule,
  ],
  controllers: [ProjectProgressLogController],
  providers: [ProjectProgressLogService],
  exports: [ProjectProgressLogService],
})
export class ProjectProgressLogModule {}
