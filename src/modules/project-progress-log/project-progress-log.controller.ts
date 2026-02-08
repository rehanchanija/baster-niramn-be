import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ProjectProgressLogService } from './project-progress-log.service';
import { CreateProjectProgressLogDto } from './dtos/create-project-progress-log.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/schemas/user.schema';

@ApiTags('Project Progress Logs')
@Controller('project-progress-logs')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ProjectProgressLogController {
  constructor(private projectProgressLogService: ProjectProgressLogService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.ENGINEER, UserRole.SUPERVISOR, UserRole.VIEWER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new project progress log (Immutable)' })
  async create(@Body() createProjectProgressLogDto: CreateProjectProgressLogDto) {
    return this.projectProgressLogService.create(createProjectProgressLogDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.ENGINEER, UserRole.SUPERVISOR, UserRole.VIEWER)
  @ApiOperation({ summary: 'Get all project progress logs' })
  async findAll() {
    return this.projectProgressLogService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.ENGINEER, UserRole.SUPERVISOR, UserRole.VIEWER)
  @ApiOperation({ summary: 'Get project progress log by ID' })
  async findById(@Param('id') id: string) {
    return this.projectProgressLogService.findById(id);
  }

  @Get('project/:projectId')
  @Roles(UserRole.ADMIN, UserRole.ENGINEER, UserRole.SUPERVISOR, UserRole.VIEWER)
  @ApiOperation({ summary: 'Get all progress logs for a project' })
  async findByProjectId(@Param('projectId') projectId: string) {
    return this.projectProgressLogService.findByProjectId(projectId);
  }
}
