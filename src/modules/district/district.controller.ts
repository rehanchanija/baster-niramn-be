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
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dtos/create-district.dto';
import { UpdateDistrictDto } from './dtos/update-district.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/schemas/user.schema';

@ApiTags('Districts')
@Controller('districts')
@Roles(UserRole.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class DistrictController {
  constructor(private districtService: DistrictService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.ENGINEER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new district' })
  async create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  @Get()
  @Roles(
    UserRole.ADMIN,
    UserRole.ENGINEER,
    UserRole.SUPERVISOR,
    UserRole.VIEWER,
  )
  @ApiOperation({ summary: 'Get all districts' })
  async findAll() {
    return this.districtService.findAll();
  }

  @Get(':id')
  @Roles(
    UserRole.ADMIN,
    UserRole.ENGINEER,
    UserRole.SUPERVISOR,
    UserRole.VIEWER,
  )
  @ApiOperation({ summary: 'Get district by ID' })
  async findById(@Param('id') id: string) {
    return this.districtService.findById(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.ENGINEER)
  @ApiOperation({ summary: 'Update district' })
  async update(
    @Param('id') id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ) {
    return this.districtService.update(id, updateDistrictDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete district' })
  async delete(@Param('id') id: string) {
    return this.districtService.delete(id);
  }
}
