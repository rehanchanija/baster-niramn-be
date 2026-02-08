import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DistrictDocument = District & Document;

@Schema({ timestamps: true })
export class District {
  @Prop({ required: true, unique: true })
  districtName: string;

  @Prop({ default: 'active' })
  status: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const DistrictSchema = SchemaFactory.createForClass(District);
