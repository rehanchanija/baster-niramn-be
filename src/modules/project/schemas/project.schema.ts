import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Panchayat } from 'src/modules/panchayat/schemas/panchayat.schema';
import { Department } from 'src/modules/department/schemas/department.schema';
import { Scheme } from 'src/modules/scheme/schemas/scheme.schema';
import { Contractor } from 'src/modules/contractor/schemas/contractor.schema';
import { WorkSubtype } from 'src/modules/work-subtype/schemas/work-subtype.schema';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Project {
  @Prop({ required: true })
  nameOfWork: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Panchayat.name,
    required: true,
  })
  panchayatId: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Department.name,
    required: true,
  })
  departmentId: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Scheme.name,
    required: true,
  })
  schemeId: string;

  @Prop({ required: true })
  fundSource: string;

  @Prop({ required: true, min: 0 })
  sanctionedAmount: number;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  tenderDate: Date;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'ProjectStatus',
    required: true,
  })
  projectStatusId: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Contractor.name,
    required: false,
    default: null,
  })
  contractorAgencyId: string| null;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: WorkSubtype.name,
    required: true,
  })
  workSubtypeId: string;

  @Prop({ required: true })
  workLocation: string;

  @Prop({ required: false })
  uploadImageBefore?: string;

  @Prop({ required: false })
  workOrderDate?: Date;

  @Prop({ required: false, min: 0 })
  workOrderAmount?: number;

  @Prop({ required: false, default: null })
  estimatedDate?: Date;

  panchayat?: Panchayat;
  department?: Department;
  scheme?: Scheme;
  contractorAgency?: Contractor;
  workSubtype?: WorkSubtype;
  projectStatus?: any;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
ProjectSchema.index({ panchayatId: 1 });
ProjectSchema.index({ departmentId: 1 });
ProjectSchema.index({ schemeId: 1 });
ProjectSchema.index({ contractorAgencyId: 1 });
ProjectSchema.index({ projectStatusId: 1 });

ProjectSchema.virtual('panchayat', {
  ref: Panchayat.name,
  localField: 'panchayatId',
  foreignField: '_id',
  justOne: true,
});

ProjectSchema.virtual('department', {
  ref: Department.name,
  localField: 'departmentId',
  foreignField: '_id',
  justOne: true,
});

ProjectSchema.virtual('scheme', {
  ref: Scheme.name,
  localField: 'schemeId',
  foreignField: '_id',
  justOne: true,
});

ProjectSchema.virtual('contractorAgency', {
  ref: Contractor.name,
  localField: 'contractorAgencyId',
  foreignField: '_id',
  justOne: true,
});

ProjectSchema.virtual('workSubtype', {
  ref: WorkSubtype.name,
  localField: 'workSubtypeId',
  foreignField: '_id',
  justOne: true,
});

ProjectSchema.virtual('projectStatus', {
  ref: 'ProjectStatus',
  localField: 'projectStatusId',
  foreignField: '_id',
  justOne: true,
});
