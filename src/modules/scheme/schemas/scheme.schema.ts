import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Department } from 'src/modules/department/schemas/department.schema';

export type SchemeDocument = Scheme & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Scheme {
  @Prop({ required: true })
  schemeName: string;

  @Prop({ required: true })
  fundingSource: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Department.name,
    required: false,
  })
  departmentId?: string;

  @Prop({
    required: true,
    match: /^\d{4}-\d{2}$/,
  })
  financialYear: string;

  @Prop({ required: false })
  remarks?: string;

  department?: Department;

  createdAt?: Date;
  updatedAt?: Date;
}

export const SchemeSchema = SchemaFactory.createForClass(Scheme);
SchemeSchema.index({ schemeName: 1 });
SchemeSchema.index({ departmentId: 1 });

SchemeSchema.virtual('department', {
  ref: Department.name,
  localField: 'departmentId',
  foreignField: '_id',
  justOne: true,
});
