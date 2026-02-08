import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { WorkType } from 'src/modules/work-type/schemas/work-type.schema';

export type WorkSubtypeDocument = WorkSubtype & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class WorkSubtype {
  @Prop({ required: true })
  workSubtypeName: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: WorkType.name,
    required: true,
  })
  parentWorkTypeId: string;

  @Prop({ required: true })
  defaultOverallCategory: string;

  parentWorkType?: WorkType;

  createdAt?: Date;
  updatedAt?: Date;
}

export const WorkSubtypeSchema = SchemaFactory.createForClass(WorkSubtype);
WorkSubtypeSchema.index({ parentWorkTypeId: 1 });

WorkSubtypeSchema.virtual('parentWorkType', {
  ref: WorkType.name,
  localField: 'parentWorkTypeId',
  foreignField: '_id',
  justOne: true,
});
