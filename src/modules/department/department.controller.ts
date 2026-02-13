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
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { UpdateDepartmentDto } from './dtos/update-department.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/schemas/user.schema';

@ApiTags('Departments')
@Controller('departments')
@Roles(UserRole.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.ENGINEER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new department' })
  async create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @Get()
  @Roles(
    UserRole.ADMIN,
    UserRole.ENGINEER,
    UserRole.SUPERVISOR,
    UserRole.VIEWER,
  )
  @ApiOperation({ summary: 'Get all departments' })
  async findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  @Roles(
    UserRole.ADMIN,
    UserRole.ENGINEER,
    UserRole.SUPERVISOR,
    UserRole.VIEWER,
  )
  @ApiOperation({ summary: 'Get department by ID' })
  async findById(@Param('id') id: string) {
    return this.departmentService.findById(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.ENGINEER)
  @ApiOperation({ summary: 'Update department' })
  async update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentService.update(id, updateDepartmentDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete department' })
  async delete(@Param('id') id: string) {
    return this.departmentService.delete(id);
  }
}
