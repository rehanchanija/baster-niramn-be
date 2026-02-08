import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkTypeService } from './work-type.service';
import { WorkTypeController } from './work-type.controller';
import { WorkType, WorkTypeSchema } from './schemas/work-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WorkType.name, schema: WorkTypeSchema }]),
  ],
  controllers: [WorkTypeController],
  providers: [WorkTypeService],
  exports: [WorkTypeService],
})
export class WorkTypeModule {}
