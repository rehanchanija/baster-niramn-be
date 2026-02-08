import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContractorDocument = Contractor & Document;

@Schema({ _id: true })
export class ContactDetails {
  @Prop({
    required: true,
    match: /^[6-9]\d{9}$/,
  })
  phone: string;

  @Prop({
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  })
  email: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: false })
  city?: string;

  @Prop({ required: false })
  state?: string;
}

@Schema({ timestamps: true })
export class Contractor {
  @Prop({ required: true })
  contractorName: string;

  @Prop({ required: true })
  contractorOrganizationName: string;


  @Prop({ type: ContactDetails, required: true })
  contactDetails: ContactDetails;

  @Prop({ required: false })
  licenseNo?: string;

  @Prop({ required: false })
  licenseImage?: string;

  @Prop({ required: false })
  gstNumber?: string;

  @Prop({ required: false })
  gstImage?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ContractorSchema = SchemaFactory.createForClass(Contractor);
ContractorSchema.index({ contractorName: 1 });
