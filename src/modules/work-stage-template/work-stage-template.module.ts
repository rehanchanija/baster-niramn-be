import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkStageTemplateService } from './work-stage-template.service';
import { WorkStageTemplateController } from './work-stage-template.controller';
import { WorkStageTemplate, WorkStageTemplateSchema } from './schemas/work-stage-template.schema';
import { WorkSubtypeModule } from '../work-subtype/work-subtype.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkStageTemplate.name, schema: WorkStageTemplateSchema },
    ]),
    WorkSubtypeModule,
  ],
  controllers: [WorkStageTemplateController],
  providers: [WorkStageTemplateService],
  exports: [WorkStageTemplateService],
})
export class WorkStageTemplateModule {}
