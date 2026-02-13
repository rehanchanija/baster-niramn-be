import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StateService } from './state.service';
import { CreateStateDto } from './dtos/create-state.dto';
import { UpdateStateDto } from './dtos/update-state.dto';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/schemas/user.schema';

@ApiTags('States')
@Roles(UserRole.ADMIN)
@Controller('states')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new state' })
  @ApiResponse({ status: 201, description: 'State created successfully' })
  @ApiResponse({ status: 409, description: 'State already exists' })
  create(@Body() createStateDto: CreateStateDto) {
    return this.stateService.create(createStateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all states' })
  @ApiResponse({ status: 200, description: 'List of all states' })
  findAll() {
    return this.stateService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a state by ID' })
  @ApiResponse({ status: 200, description: 'State found' })
  @ApiResponse({ status: 404, description: 'State not found' })
  findOne(@Param('id') id: string) {
    return this.stateService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a state' })
  @ApiResponse({ status: 200, description: 'State updated successfully' })
  @ApiResponse({ status: 404, description: 'State not found' })
  update(@Param('id') id: string, @Body() updateStateDto: UpdateStateDto) {
    return this.stateService.update(id, updateStateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a state' })
  @ApiResponse({ status: 204, description: 'State deleted successfully' })
  @ApiResponse({ status: 404, description: 'State not found' })
  remove(@Param('id') id: string) {
    return this.stateService.remove(id);
  }
}
