import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { District } from 'src/modules/district/schemas/district.schema';
import { CityVillage } from 'src/modules/city-village/schemas/city-village.schema';
import { Block } from 'src/modules/block/schemas/block.schema';

export type PanchayatDocument = Panchayat & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Panchayat {
  @Prop({ required: true })
  panchayatName: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'District',
    required: true,
  })
  districtId: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: CityVillage.name,
    required: true,
  })
  cityVillageId: string;

  district?: District;
  cityVillage?: CityVillage;
  block?: Block;

  @Prop({ required: false })
  zilaPanchayatName?: string;

  @Prop({ required: false })
  janpadPanchayatName?: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Block',
    required: false,
  })
  blockId?: string;

  @Prop({ required: true })
  sarpanchName: string;

  @Prop({
    required: true,
    match: /^[6-9]\d{9}$/,
  })
  sarpanchContact: string;

  @Prop({ required: true })
  panchayatSecretaryName: string;

  @Prop({
    required: true,
    match: /^[6-9]\d{9}$/,
  })
  panchayatSecretaryContact: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const PanchayatSchema = SchemaFactory.createForClass(Panchayat);
PanchayatSchema.index({ panchayatName: 1 });
PanchayatSchema.index({ districtId: 1 });
PanchayatSchema.index({ cityVillageId: 1 });
PanchayatSchema.index({ blockId: 1 });

PanchayatSchema.virtual('district', {
  ref: 'District',
  localField: 'districtId',
  foreignField: '_id',
  justOne: true,
});

PanchayatSchema.virtual('cityVillage', {
  ref: CityVillage.name,
  localField: 'cityVillageId',
  foreignField: '_id',
  justOne: true,
});

PanchayatSchema.virtual('block', {
  ref: 'Block',
  localField: 'blockId',
  foreignField: '_id',
  justOne: true,
});
