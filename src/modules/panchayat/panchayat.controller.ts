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
import { PanchayatService } from './panchayat.service';
import { CreatePanchayatDto } from './dtos/create-panchayat.dto';
import { UpdatePanchayatDto } from './dtos/update-panchayat.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/schemas/user.schema';

@ApiTags('Panchayats')
@Roles(UserRole.ADMIN)
@Controller('panchayats')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PanchayatController {
  constructor(private panchayatService: PanchayatService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.VIEWER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new panchayat' })
  async create(@Body() createPanchayatDto: CreatePanchayatDto) {
    return this.panchayatService.create(createPanchayatDto);
  }

  @Get()
  @Roles(
    UserRole.ADMIN,
    UserRole.ENGINEER,
    UserRole.SUPERVISOR,
    UserRole.VIEWER,
  )
  @ApiOperation({ summary: 'Get all panchayats' })
  async findAll() {
    return this.panchayatService.findAll();
  }

  @Get(':id')
  @Roles(
    UserRole.ADMIN,
    UserRole.ENGINEER,
    UserRole.SUPERVISOR,
    UserRole.VIEWER,
  )
  @ApiOperation({ summary: 'Get panchayat by ID' })
  async findById(@Param('id') id: string) {
    return this.panchayatService.findById(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.ENGINEER)
  @ApiOperation({ summary: 'Update panchayat' })
  async update(
    @Param('id') id: string,
    @Body() updatePanchayatDto: UpdatePanchayatDto,
  ) {
    return this.panchayatService.update(id, updatePanchayatDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete panchayat' })
  async delete(@Param('id') id: string) {
    return this.panchayatService.delete(id);
  }
}
