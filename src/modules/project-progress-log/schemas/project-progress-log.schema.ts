import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ProjectStageTracker } from 'src/modules/project-stage-tracker/schemas/project-stage-tracker.schema';
import { Project } from 'src/modules/project/schemas/project.schema';

export type ProjectProgressLogDocument = ProjectProgressLog & Document;

export enum TimelineStatus {
  ON_TRACK = 'On Track',
  DELAYED = 'Delayed',
  CRITICAL = 'Critical',
}

@Schema({ _id: true })
export class GeoLocation {
  @Prop({ required: false, type: Number })
  latitude?: number;

  @Prop({ required: false, type: Number })
  longitude?: number;
}

@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class ProjectProgressLog {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Project.name,
    required: true,
  })
  projectId: string;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: ProjectStageTracker.name })
  currentStageId: string;

  @Prop({ required: true, min: 0, max: 100 })
  previousOverallProgress: number;

  @Prop({ required: true, min: 0, max: 100 })
  updatedOverallProgress: number;

  @Prop({
    type: String,
    enum: TimelineStatus,
    required: true,
  })
  timelineStatus: TimelineStatus;

  @Prop({ required: true })
  expectedCompletionDate: Date;

  @Prop({ required: true, min: 1, max: 5 })
  workQualityRating: number;

  @Prop({ required: false })
  fieldRemarks?: string;

  @Prop({ type: [String], required: false })
  photoUpload?: string[];

  @Prop({ type: GeoLocation, required: false })
  geoLocation?: GeoLocation;

  project?: Project;
  currentStage?: ProjectStageTracker;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProjectProgressLogSchema =
  SchemaFactory.createForClass(ProjectProgressLog);
ProjectProgressLogSchema.index({ projectId: 1 });

ProjectProgressLogSchema.virtual('project', {
  ref: Project.name,
  localField: 'projectId',
  foreignField: '_id',
  justOne: true,

});

ProjectProgressLogSchema.virtual('currentStage', {
  ref: ProjectStageTracker.name,
  localField: 'currentStageId',
  foreignField: '_id',
  justOne: true,
});

