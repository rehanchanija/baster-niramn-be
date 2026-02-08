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
import { WorkSubtypeService } from './work-subtype.service';
import { CreateWorkSubtypeDto } from './dtos/create-work-subtype.dto';
import { UpdateWorkSubtypeDto } from './dtos/update-work-subtype.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/schemas/user.schema';

@ApiTags('Work Subtypes')
@Controller('work-subtypes')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class WorkSubtypeController {
  constructor(private workSubtypeService: WorkSubtypeService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.ENGINEER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new work subtype' })
  async create(@Body() createWorkSubtypeDto: CreateWorkSubtypeDto) {
    return this.workSubtypeService.create(createWorkSubtypeDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.ENGINEER, UserRole.SUPERVISOR, UserRole.VIEWER)
  @ApiOperation({ summary: 'Get all work subtypes' })
  async findAll() {
    return this.workSubtypeService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.ENGINEER, UserRole.SUPERVISOR, UserRole.VIEWER)
  @ApiOperation({ summary: 'Get work subtype by ID' })
  async findById(@Param('id') id: string) {
    return this.workSubtypeService.findById(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.ENGINEER)
  @ApiOperation({ summary: 'Update work subtype' })
  async update(
    @Param('id') id: string,
    @Body() updateWorkSubtypeDto: UpdateWorkSubtypeDto,
  ) {
    return this.workSubtypeService.update(id, updateWorkSubtypeDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete work subtype' })
  async delete(@Param('id') id: string) {
    return this.workSubtypeService.delete(id);
  }
}
