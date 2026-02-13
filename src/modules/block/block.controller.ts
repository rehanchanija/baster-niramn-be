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
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { BlockService } from './block.service';
import { CreateBlockDto } from './dtos/create-block.dto';
import { UpdateBlockDto } from './dtos/update-block.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/auth/schemas/user.schema';

@ApiTags('Blocks')
@Roles(UserRole.ADMIN)
@Controller('blocks')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new block' })
  @ApiResponse({ status: 201, description: 'Block created successfully' })
  @ApiResponse({ status: 409, description: 'Block already exists' })
  create(@Body() createBlockDto: CreateBlockDto) {
    return this.blockService.create(createBlockDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all blocks' })
  @ApiQuery({
    name: 'stateId',
    required: false,
    description: 'Filter by state ID',
  })
  @ApiResponse({ status: 200, description: 'List of all blocks' })
  findAll(@Query('stateId') stateId?: string) {
    return this.blockService.findAll(stateId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a block by ID' })
  @ApiResponse({ status: 200, description: 'Block found' })
  @ApiResponse({ status: 404, description: 'Block not found' })
  findOne(@Param('id') id: string) {
    return this.blockService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a block' })
  @ApiResponse({ status: 200, description: 'Block updated successfully' })
  @ApiResponse({ status: 404, description: 'Block not found' })
  update(@Param('id') id: string, @Body() updateBlockDto: UpdateBlockDto) {
    return this.blockService.update(id, updateBlockDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a block' })
  @ApiResponse({ status: 204, description: 'Block deleted successfully' })
  @ApiResponse({ status: 404, description: 'Block not found' })
  remove(@Param('id') id: string) {
    return this.blockService.remove(id);
  }
}
