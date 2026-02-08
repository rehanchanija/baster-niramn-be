import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { WorkTypeModule } from './modules/work-type/work-type.module';
import { WorkSubtypeModule } from './modules/work-subtype/work-subtype.module';
import { WorkStageTemplateModule } from './modules/work-stage-template/work-stage-template.module';
import { ContractorModule } from './modules/contractor/contractor.module';
import { DepartmentModule } from './modules/department/department.module';
import { SchemeModule } from './modules/scheme/scheme.module';
import { PanchayatModule } from './modules/panchayat/panchayat.module';
import { ProjectModule } from './modules/project/project.module';
import { ProjectStageTrackerModule } from './modules/project-stage-tracker/project-stage-tracker.module';
import { ProjectProgressLogModule } from './modules/project-progress-log/project-progress-log.module';
import { DistrictModule } from './modules/district/district.module';
import { ProjectStatusModule } from './modules/project-status/project-status.module';
import { CityVillageModule } from './modules/city-village/city-village.module';
import { UploadModule } from './modules/upload/upload.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    AuthModule,
    WorkTypeModule,
    WorkSubtypeModule,
    WorkStageTemplateModule,
    ContractorModule,
    DepartmentModule,
    SchemeModule,
    PanchayatModule,
    ProjectModule,
    ProjectStageTrackerModule,
    ProjectProgressLogModule,
    DistrictModule,
    ProjectStatusModule,
    CityVillageModule,
    UploadModule,
    DashboardModule,
  ],
})
export class AppModule {}
