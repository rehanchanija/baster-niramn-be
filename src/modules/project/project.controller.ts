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
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/schemas/user.schema';

@ApiTags('Projects')
@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.VIEWER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Create new project',
    description: 'Create a new project with work details, funding, and contractor information',
  })
  @ApiBody({
    description: 'Project creation details',
    type: CreateProjectDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Project created successfully',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        nameOfWork: 'Road Construction Project',
        panchayatId: '507f1f77bcf86cd799439001',
        departmentId: '507f1f77bcf86cd799439002',
        schemeId: '507f1f77bcf86cd799439003',
        fundSource: 'Government Grant',
        sanctionedAmount: 500000,
        startDate: '2024-01-24T10:00:00.000Z',
        endDate: '2025-01-24T10:00:00.000Z',
        tenderDate: '2024-02-15T10:00:00.000Z',
        projectStatusId: '507f1f77bcf86cd799439020',
        contractorAgencyId: '507f1f77bcf86cd799439004',
        workTypeId: '507f1f77bcf86cd799439005',
        workLocation: 'Main Market Area',
        uploadImageBefore: 'https://example.com/site-before.jpg',
        workOrderDate: '2024-02-01T10:00:00.000Z',
        workOrderNo: 'WO/2024/001',
        workOrderAmount: 450000,
        createdAt: '2024-01-24T10:00:00.000Z',
        updatedAt: '2024-01-24T10:00:00.000Z',
      },
    },
  })
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.ENGINEER, UserRole.SUPERVISOR, UserRole.VIEWER)
  @ApiOperation({ 
    summary: 'Get all projects',
    description: 'Retrieve a list of all projects with populated references',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of projects',
    schema: {
      type: 'array',
      example: [
        {
          _id: '507f1f77bcf86cd799439011',
          nameOfWork: 'Road Construction Project',
          fundSource: 'Government Grant',
          sanctionedAmount: 500000,
          startDate: '2024-01-24T10:00:00.000Z',
          endDate: '2025-01-24T10:00:00.000Z',
          tenderDate: '2024-02-15T10:00:00.000Z',
          panchayat: {
            _id: '507f1f77bcf86cd799439001',
            panchayatName: 'Gram Panchayat A',
          },
        },
      ],
    },
  })
  async findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.ENGINEER, UserRole.SUPERVISOR, UserRole.VIEWER)
  @ApiOperation({ 
    summary: 'Get project by ID',
    description: 'Retrieve a specific project with all related details populated',
  })
  @ApiParam({
    name: 'id',
    description: 'Project MongoDB ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Project details',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        nameOfWork: 'Road Construction Project',
        panchayatId: '507f1f77bcf86cd799439001',
        departmentId: '507f1f77bcf86cd799439002',
        schemeId: '507f1f77bcf86cd799439003',
        fundSource: 'Government Grant',
        sanctionedAmount: 500000,
        startDate: '2024-01-24T10:00:00.000Z',
        endDate: '2025-01-24T10:00:00.000Z',
        tenderDate: '2024-02-15T10:00:00.000Z',
        contractorAgencyId: '507f1f77bcf86cd799439004',
        workTypeId: '507f1f77bcf86cd799439005',
        workLocation: 'Main Market Area',
        uploadImageBefore: 'https://example.com/site-before.jpg',
        workOrderDate: '2024-02-01T10:00:00.000Z',
        workOrderNo: 'WO/2024/001',
        workOrderAmount: 450000,
        projectStatus: {
          _id: '507f1f77bcf86cd799439020',
          statusName: 'Technical Stage',
        },
        panchayat: {
          _id: '507f1f77bcf86cd799439001',
          panchayatName: 'Gram Panchayat A',
          district: {
            _id: '507f1f77bcf86cd799439008',
            districtName: 'Bastar',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Project not found',
  })
  async findById(@Param('id') id: string) {
    return this.projectService.findById(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.ENGINEER, UserRole.SUPERVISOR, UserRole.VIEWER)
  @ApiOperation({ 
    summary: 'Update project',
    description: 'Update project details with partial updates supported',
  })
  @ApiParam({
    name: 'id',
    description: 'Project MongoDB ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiBody({
    description: 'Fields to update',
    type: UpdateProjectDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Project updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Project not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ 
    summary: 'Delete project',
    description: 'Delete a project by ID (Admin only)',
  })
  @ApiParam({
    name: 'id',
    description: 'Project MongoDB ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Project deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Project not found',
  })
  async delete(@Param('id') id: string) {
    return this.projectService.delete(id);
  }
}
