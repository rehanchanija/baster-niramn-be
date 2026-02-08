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
import { SchemeService } from './scheme.service';
import { CreateSchemeDto } from './dtos/create-scheme.dto';
import { UpdateSchemeDto } from './dtos/update-scheme.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/schemas/user.schema';

@ApiTags('Schemes')
@Controller('schemes')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class SchemeController {
  constructor(private schemeService: SchemeService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.ENGINEER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new scheme' })
  async create(@Body() createSchemeDto: CreateSchemeDto) {
    return this.schemeService.create(createSchemeDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.ENGINEER, UserRole.SUPERVISOR, UserRole.VIEWER)
  @ApiOperation({ summary: 'Get all schemes' })
  async findAll() {
    return this.schemeService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.ENGINEER, UserRole.SUPERVISOR, UserRole.VIEWER)
  @ApiOperation({ summary: 'Get scheme by ID' })
  async findById(@Param('id') id: string) {
    return this.schemeService.findById(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.ENGINEER)
  @ApiOperation({ summary: 'Update scheme' })
  async update(
    @Param('id') id: string,
    @Body() updateSchemeDto: UpdateSchemeDto,
  ) {
    return this.schemeService.update(id, updateSchemeDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete scheme' })
  async delete(@Param('id') id: string) {
    return this.schemeService.delete(id);
  }
}
