import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DepartmentDocument = Department & Document;

@Schema({ timestamps: true })
export class Department {
  @Prop({ required: true, unique: true })
  departmentName: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
