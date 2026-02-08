import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { WorkSubtype } from 'src/modules/work-subtype/schemas/work-subtype.schema';

export type WorkStageTemplateDocument = WorkStageTemplate & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class WorkStageTemplate {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: WorkSubtype.name,
    required: true,
  })
  workSubtypeId: string;

  @Prop({ required: true })
  stageName: string;

  @Prop({ required: true, min: 1 })
  stageSequenceNumber: number;

  @Prop({ default: false })
  isMandatory: boolean;

  workSubtype?: WorkSubtype;

  createdAt?: Date;
  updatedAt?: Date;
}

export const WorkStageTemplateSchema =
  SchemaFactory.createForClass(WorkStageTemplate);
WorkStageTemplateSchema.index({ workSubtypeId: 1, stageSequenceNumber: 1 });

WorkStageTemplateSchema.virtual('workSubtype', {
  ref: WorkSubtype.name,
  localField: 'workSubtypeId',
  foreignField: '_id',
  justOne: true,
});
