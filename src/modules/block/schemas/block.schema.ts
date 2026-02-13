import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { State } from 'src/modules/state/schemas/state.schema';

export type BlockDocument = Block & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Block {
  @Prop({ required: true })
  blockName: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'State',
    required: true,
  })
  stateId: string;

  state?: State;

  createdAt?: Date;
  updatedAt?: Date;
}

export const BlockSchema = SchemaFactory.createForClass(Block);
BlockSchema.index({ blockName: 1 });
BlockSchema.index({ stateId: 1 });

BlockSchema.virtual('state', {
  ref: 'State',
  localField: 'stateId',
  foreignField: '_id',
  justOne: true,
});
