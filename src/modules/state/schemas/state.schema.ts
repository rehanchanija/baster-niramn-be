import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StateDocument = State & Document;

@Schema({ timestamps: true })
export class State {
  @Prop({ required: true, unique: true })
  stateName: string;

  @Prop({ required: false })
  stateCode?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const StateSchema = SchemaFactory.createForClass(State);
StateSchema.index({ stateName: 1 });
