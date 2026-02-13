import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CityVillageService } from './city-village.service';
import { CreateCityVillageDto } from './dtos/create-city-village.dto';
import { UpdateCityVillageDto } from './dtos/update-city-village.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/auth/schemas/user.schema';

@ApiTags('City/Village')
@Controller('city-villages')
@Roles(UserRole.ADMIN)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CityVillageController {
  constructor(private readonly cityVillageService: CityVillageService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new city or village' })
  create(@Body() createCityVillageDto: CreateCityVillageDto) {
    return this.cityVillageService.create(createCityVillageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cities and villages' })
  findAll() {
    return this.cityVillageService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a city or village by ID' })
  findOne(@Param('id') id: string) {
    return this.cityVillageService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a city or village' })
  update(
    @Param('id') id: string,
    @Body() updateCityVillageDto: UpdateCityVillageDto,
  ) {
    return this.cityVillageService.update(id, updateCityVillageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a city or village' })
  remove(@Param('id') id: string) {
    return this.cityVillageService.delete(id);
  }
}
