import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkTypeDocument = WorkType & Document;

@Schema({ timestamps: true })
export class WorkType {
  @Prop({ required: true, minlength: 3 })
  workTypeName: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const WorkTypeSchema = SchemaFactory.createForClass(WorkType);
WorkTypeSchema.index({ workTypeName: 1 });
