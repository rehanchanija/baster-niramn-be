import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';

export type UserDocument = User & Document;

export enum UserRole {
  ADMIN = 'admin',
  ENGINEER = 'manager ',
  SUPERVISOR = 'department Officer',
  VIEWER = 'feild executer',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.VIEWER,
  })
  role: UserRole;

  @Prop({ required: false })
  contactNumber: string;

  @Prop({ required: false })
  address: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ required: false })
  refreshToken?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
