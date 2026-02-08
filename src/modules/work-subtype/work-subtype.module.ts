import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkSubtypeService } from './work-subtype.service';
import { WorkSubtypeController } from './work-subtype.controller';
import { WorkSubtype, WorkSubtypeSchema } from './schemas/work-subtype.schema';
import { WorkTypeModule } from '../work-type/work-type.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkSubtype.name, schema: WorkSubtypeSchema },
    ]),
    WorkTypeModule,
  ],
  controllers: [WorkSubtypeController],
  providers: [WorkSubtypeService],
  exports: [WorkSubtypeService],
})
export class WorkSubtypeModule {}
