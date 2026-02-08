import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CityVillageDocument = CityVillage & Document;

@Schema({ timestamps: true })
export class CityVillage {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: String,
    enum: ['City', 'Village'],
    required: true,
  })
  type: string;

  @Prop({ required: false })
  pincode?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const CityVillageSchema = SchemaFactory.createForClass(CityVillage);
CityVillageSchema.index({ name: 1 });
CityVillageSchema.index({ type: 1 });
