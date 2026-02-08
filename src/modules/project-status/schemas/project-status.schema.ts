import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectStatusDocument = ProjectStatus & Document;

@Schema({ timestamps: true })
export class ProjectStatus {
  @Prop({ required: true, unique: true })
  statusName: string;

  @Prop({ default: 'active' })
  status: string; // active/inactive

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProjectStatusSchema = SchemaFactory.createForClass(ProjectStatus);
