import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Project } from 'src/modules/project/schemas/project.schema';

export type ProjectStageTrackerDocument = ProjectStageTracker & Document;

export enum StageStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  PROCESSING = 'Processing',
  STARTED = 'Started',
  REJECTED = 'Rejected',
}

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class ProjectStageTracker {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Project.name,
    required: true,
  })
  projectId: string;

  @Prop({ required: true })
  stageName: string;

  @Prop({ required: true })
  stageSequence: number;

  @Prop({
    type: String,
    enum: StageStatus,
    default: StageStatus.PENDING,
  })
  stageStatus: StageStatus;

  @Prop({
    required: true,
    min: 0,
    max: 100,
    default: 0,
  })
  completionProgress: number;

  @Prop({ required: false })
  completionDate?: Date;

  @Prop({ required: false })
  remarks?: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'ProjectStatus',
    required: false,
    default: null,
  })
  projectStatusId: string;

  @Prop({ required: false })
  review?: string;

  @Prop({ required: false })
  updateDate?: Date;

  @Prop({ required: false })
  updateBy?: string;

  @Prop({ type: [String], required: false, default: [] })
  images?: string[];

  @Prop({ required: false })
  geolocation?: string;

  project?: Project;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProjectStageTrackerSchema =
  SchemaFactory.createForClass(ProjectStageTracker);
ProjectStageTrackerSchema.index({ projectId: 1 });
ProjectStageTrackerSchema.index({ stageSequence: 1 });
ProjectStageTrackerSchema.index({ projectStatusId: 1 });

ProjectStageTrackerSchema.virtual('project', {
  ref: Project.name,
  localField: 'projectId',
  foreignField: '_id',
  justOne: true,
});

ProjectStageTrackerSchema.virtual('projectStatus', {
  ref: 'ProjectStatus',
  localField: 'projectStatusId',
  foreignField: '_id',
  justOne: true,
});
