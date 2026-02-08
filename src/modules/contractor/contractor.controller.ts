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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ContractorService } from './contractor.service';
import { CreateContractorDto } from './dtos/create-contractor.dto';
import { UpdateContractorDto } from './dtos/update-contractor.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../auth/schemas/user.schema';

@ApiTags('Contractors')
@Controller('contractors')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ContractorController {
  constructor(private contractorService: ContractorService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.VIEWER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create new contractor',
    description: 'Create a new contractor with contact details',
  })
  @ApiBody({
    description: 'Contractor creation details',
    type: CreateContractorDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Contractor created successfully',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        contractorName: 'XYZ Construction Co.',
        contractorOrganizationName: 'XYZ Construction Team',
        contactDetails: {
          phone: '9876543210',
          email: 'contractor@example.com',
          address: '123 Main Street, City, State 12345',
          city: 'Jagdalpur',
          state: 'Chhattisgarh',
        },
        licenseNo: 'LIC123456789',
        licenseImage: 'https://example.com/license.jpg',
        gstNumber: '22AAAAA0000A1Z5',
        gstImage: 'https://example.com/gst.jpg',
        createdAt: '2024-01-24T10:00:00.000Z',
        updatedAt: '2024-01-24T10:00:00.000Z',
      },
    },
  })
  async create(@Body() createContractorDto: CreateContractorDto) {
    return this.contractorService.create(createContractorDto);
  }

  @Get()
  @Roles(
    UserRole.ADMIN,
    UserRole.ENGINEER,
    UserRole.SUPERVISOR,
    UserRole.VIEWER,
  )
  @ApiOperation({
    summary: 'Get all contractors',
    description: 'Retrieve a list of all contractors',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of contractors',
    schema: {
      type: 'array',
      example: [
        {
          _id: '507f1f77bcf86cd799439011',
          contractorName: 'XYZ Construction Co.',
          contractorOrganizationName: 'XYZ Construction Team',
          contactDetails: {
            phone: '9876543210',
            email: 'contractor@example.com',
            address: '123 Main Street, City, State 12345',
            city: 'Jagdalpur',
            state: 'Chhattisgarh',
          },
          licenseNo: 'LIC123456789',
          licenseImage: 'https://example.com/license.jpg',
          gstNumber: '22AAAAA0000A1Z5',
          gstImage: 'https://example.com/gst.jpg',
        },
      ],
    },
  })
  async findAll() {
    return this.contractorService.findAll();
  }

  @Get(':id')
  @Roles(
    UserRole.ADMIN,
    UserRole.ENGINEER,
    UserRole.SUPERVISOR,
    UserRole.VIEWER,
  )
  @ApiOperation({
    summary: 'Get contractor by ID',
    description: 'Retrieve a specific contractor by their ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Contractor MongoDB ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Contractor details',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        contractorName: 'XYZ Construction Co.',
        contractorOrganizationName: 'XYZ Construction Team',
        contactDetails: {
          phone: '9876543210',
          email: 'contractor@example.com',
          address: '123 Main Street, City, State 12345',
          city: 'Jagdalpur',
          state: 'Chhattisgarh',
        },
        licenseNo: 'LIC123456789',
        licenseImage: 'https://example.com/license.jpg',
        gstNumber: '22AAAAA0000A1Z5',
        gstImage: 'https://example.com/gst.jpg',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Contractor not found',
  })
  async findById(@Param('id') id: string) {
    return this.contractorService.findById(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.VIEWER)
  @ApiOperation({
    summary: 'Update contractor',
    description: 'Update contractor details',
  })
  @ApiParam({
    name: 'id',
    description: 'Contractor MongoDB ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiBody({
    description: 'Fields to update',
    type: UpdateContractorDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Contractor updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Contractor not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateContractorDto: UpdateContractorDto,
  ) {
    return this.contractorService.update(id, updateContractorDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete contractor',
    description: 'Delete a contractor by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Contractor MongoDB ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Contractor deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Contractor not found',
  })
  async delete(@Param('id') id: string) {
    return this.contractorService.delete(id);
  }
}
