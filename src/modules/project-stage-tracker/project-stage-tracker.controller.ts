import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ProjectStageTrackerService } from './project-stage-tracker.service';
import { CreateProjectStageTrackerDto } from './dtos/create-project-stage-tracker.dto';
import { UpdateProjectStageTrackerDto } from './dtos/update-project-stage-tracker.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/schemas/user.schema';

@ApiTags('Project Stage Trackers')
@Controller('project-stage-trackers')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ProjectStageTrackerController {
  constructor(private projectStageTrackerService: ProjectStageTrackerService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.VIEWER, UserRole.SUPERVISOR)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new project stage tracker' })
  async create(
    @Body() createProjectStageTrackerDto: CreateProjectStageTrackerDto,
  ) {
    return this.projectStageTrackerService.create(createProjectStageTrackerDto);
  }

  @Get()
  @Roles(
    UserRole.ADMIN,
    UserRole.ENGINEER,
    UserRole.SUPERVISOR,
    UserRole.VIEWER,
  )
  @ApiOperation({ summary: 'Get all project stage trackers' })
  async findAll() {
    return this.projectStageTrackerService.findAll();
  }

  @Get(':id')
  @Roles(
    UserRole.ADMIN,
    UserRole.ENGINEER,
    UserRole.SUPERVISOR,
    UserRole.VIEWER,
  )
  @ApiOperation({ summary: 'Get project stage tracker by ID' })
  async findById(@Param('id') id: string) {
    return this.projectStageTrackerService.findById(id);
  }

  @Get('project/:projectId')
  @Roles(
    UserRole.ADMIN,
    UserRole.ENGINEER,
    UserRole.SUPERVISOR,
    UserRole.VIEWER,
  )
  @ApiOperation({ summary: 'Get all stages for a specific project' })
  async findByProjectId(@Param('projectId') projectId: string) {
    return this.projectStageTrackerService.findByProjectId(projectId);
  }

  @Get('project/:projectId/completion')
  @Roles(
    UserRole.ADMIN,
    UserRole.ENGINEER,
    UserRole.SUPERVISOR,
    UserRole.VIEWER,
  )
  @ApiOperation({ summary: 'Get overall completion percentage for a project' })
  async getProjectCompletion(@Param('projectId') projectId: string) {
    const completion =
      await this.projectStageTrackerService.getProjectOverallCompletion(
        projectId,
      );
    return { projectId, overallCompletion: completion };
  }

  @Patch(':id')
  @Roles(
    UserRole.ADMIN,
    UserRole.ENGINEER,
    UserRole.SUPERVISOR,
    UserRole.VIEWER,
  )
  @ApiOperation({ summary: 'Update project stage tracker' })
  async update(
    @Param('id') id: string,
    @Body() updateProjectStageTrackerDto: UpdateProjectStageTrackerDto,
  ) {
    return this.projectStageTrackerService.update(
      id,
      updateProjectStageTrackerDto,
    );
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete project stage tracker' })
  async delete(@Param('id') id: string) {
    return this.projectStageTrackerService.delete(id);
  }
}
