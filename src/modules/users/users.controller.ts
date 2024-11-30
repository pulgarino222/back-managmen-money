import { Controller, Get, Post, Body, Query, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserPipe } from './pipes/create-user.pipe';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { PaginationValidationPipe } from 'src/common/pipe/pagination.pipe';
import { FindById } from './dto/find-by-id.dto';
import { FindByIdPipeCustom } from './pipes/fin-by-id.pipe';
import { UpdateUserPipe } from './pipes/update-user.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/jwt-roles.guard';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users') 
@ApiBearerAuth() 
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'List of users', type: [CreateUserDto] }) 
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' }) 
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Limit of users per page' })
  findAll(@Query(PaginationValidationPipe) Pagination: PaginationDTO) {
    return this.usersService.findAll(Pagination);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'User found', type: CreateUserDto }) 
  @ApiResponse({ status: 404, description: 'User not found' }) 
  @ApiParam({ name: 'id', type: String, description: 'User ID' }) 
  findOne(@Param(FindByIdPipeCustom) id: FindById) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'User updated', type: CreateUserDto }) 
  @ApiResponse({ status: 404, description: 'User not found' }) 
  @ApiParam({ name: 'id', type: String, description: 'User ID' }) 
  @ApiBody({ type: UpdateUserDto }) // Cuerpo de la solicitud
  update(@Param(FindByIdPipeCustom) id: FindById, @Body(UpdateUserPipe) updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'User removed' }) 
  @ApiResponse({ status: 404, description: 'User not found' }) 
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  remove(@Param(FindByIdPipeCustom) id: FindById) {
    return this.usersService.remove(id);
  }
}
