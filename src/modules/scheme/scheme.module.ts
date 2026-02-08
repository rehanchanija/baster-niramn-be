import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemeService } from './scheme.service';
import { SchemeController } from './scheme.controller';
import { Scheme, SchemeSchema } from './schemas/scheme.schema';
import { DepartmentModule } from '../department/department.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Scheme.name, schema: SchemeSchema }]),
    DepartmentModule,
  ],
  controllers: [SchemeController],
  providers: [SchemeService],
  exports: [SchemeService],
})
export class SchemeModule {}
