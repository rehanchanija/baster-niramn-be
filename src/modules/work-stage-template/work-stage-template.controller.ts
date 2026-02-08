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
import { WorkStageTemplateService } from './work-stage-template.service';
import { CreateWorkStageTemplateDto } from './dtos/create-work-stage-template.dto';
import { UpdateWorkStageTemplateDto } from './dtos/update-work-stage-template.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/schemas/user.schema';

@ApiTags('Work Stage Templates')
@Controller('work-stage-templates')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class WorkStageTemplateController {
  constructor(private workStageTemplateService: WorkStageTemplateService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.VIEWER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new work stage template' })
  async create(@Body() createWorkStageTemplateDto: CreateWorkStageTemplateDto) {
    return this.workStageTemplateService.create(createWorkStageTemplateDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.ENGINEER, UserRole.SUPERVISOR, UserRole.VIEWER)
  @ApiOperation({ summary: 'Get all work stage templates' })
  async findAll() {
    return this.workStageTemplateService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.ENGINEER, UserRole.SUPERVISOR, UserRole.VIEWER)
  @ApiOperation({ summary: 'Get work stage template by ID' })
  async findById(@Param('id') id: string) {
    return this.workStageTemplateService.findById(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.ENGINEER)
  @ApiOperation({ summary: 'Update work stage template' })
  async update(
    @Param('id') id: string,
    @Body() updateWorkStageTemplateDto: UpdateWorkStageTemplateDto,
  ) {
    return this.workStageTemplateService.update(id, updateWorkStageTemplateDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete work stage template' })
  async delete(@Param('id') id: string) {
    return this.workStageTemplateService.delete(id);
  }
}
