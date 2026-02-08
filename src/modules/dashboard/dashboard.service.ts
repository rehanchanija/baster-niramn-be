import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from '../project/schemas/project.schema';
import {
  Contractor,
  ContractorDocument,
} from '../contractor/schemas/contractor.schema';
import {
  ProjectStatus,
  ProjectStatusDocument,
} from '../project-status/schemas/project-status.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(Contractor.name)
    private contractorModel: Model<ContractorDocument>,
    @InjectModel(ProjectStatus.name)
    private projectStatusModel: Model<ProjectStatusDocument>,
  ) {}

  async getStats() {
    // Get all project statuses to map counts correctly
    const statuses = await this.projectStatusModel.find().exec();

    const statusMap = {};
    statuses.forEach((s) => {
      statusMap[s.statusName] = s._id;
    });

    const [
      totalWork,
      totalContractor,
      ongoingWork,
      completed,
      rejected,
      technicalStage,
      workOrderPending,
      ongoingTender,
      workOrderReleased,
    ] = await Promise.all([
      this.projectModel.countDocuments({}).exec(),
      this.contractorModel.countDocuments({}).exec(),
      this.getCountByStatus(
        statusMap['Ongoing Work'] || statusMap['In Progress'],
      ),
      this.getCountByStatus(statusMap['Completed']),
      this.getCountByStatus(statusMap['Rejected']),
      this.getCountByStatus(statusMap['Technical Stage']),
      this.getCountByStatus(statusMap['Work Order Pending']),
      this.getCountByStatus(statusMap['Ongoing Tender']),
      this.getCountByStatus(statusMap['Work Order Released']),
    ]);

    return {
      totalWork,
      ongoingWork,
      completed,
      rejected,
      technicalStage,
      workOrderPending,
      ongoingTender,
      workOrderReleased,
      totalContractor,
    };
  }

  private async getCountByStatus(statusId: string) {
    if (!statusId) return 0;
    return this.projectModel
      .countDocuments({ projectStatusId: statusId })
      .exec();
  }
}
