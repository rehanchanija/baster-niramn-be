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
import { WorkTypeService } from './work-type.service';
import { CreateWorkTypeDto } from './dtos/create-work-type.dto';
import { UpdateWorkTypeDto } from './dtos/update-work-type.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/schemas/user.schema';

@ApiTags('Work Types')
@Roles(UserRole.ADMIN)
@Controller('work-types')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class WorkTypeController {
  constructor(private workTypeService: WorkTypeService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.ENGINEER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new work type' })
  async create(@Body() createWorkTypeDto: CreateWorkTypeDto) {
    return this.workTypeService.create(createWorkTypeDto);
  }

  @Get()
  @Roles(
    UserRole.ADMIN,
    UserRole.ENGINEER,
    UserRole.SUPERVISOR,
    UserRole.VIEWER,
  )
  @ApiOperation({ summary: 'Get all work types' })
  async findAll() {
    return this.workTypeService.findAll();
  }

  @Get(':id')
  @Roles(
    UserRole.ADMIN,
    UserRole.ENGINEER,
    UserRole.SUPERVISOR,
    UserRole.VIEWER,
  )
  @ApiOperation({ summary: 'Get work type by ID' })
  async findById(@Param('id') id: string) {
    return this.workTypeService.findById(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.ENGINEER)
  @ApiOperation({ summary: 'Update work type' })
  async update(
    @Param('id') id: string,
    @Body() updateWorkTypeDto: UpdateWorkTypeDto,
  ) {
    return this.workTypeService.update(id, updateWorkTypeDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete work type' })
  async delete(@Param('id') id: string) {
    return this.workTypeService.delete(id);
  }
}
