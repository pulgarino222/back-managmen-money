import { Controller, Get, Post, Body, Param, Put, Delete, Request, Patch } from '@nestjs/common';
import { IncomeService } from './income.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { Income } from './entities/income.entity';
import { User } from '../users/entities/user.entity';

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  async create(
    @Body() createIncomeDto: CreateIncomeDto 
  ): Promise<Income> {
    return this.incomeService.create(createIncomeDto);
  }

  @Get()
  async getIncomesForCurrentMonth(@Request() req: { user: User }): Promise<Income[]> {
    return this.incomeService.getIncomesForCurrentMonth(req.user);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateIncomeDto: UpdateIncomeDto, 
    @Request() req: { user: User }
  ): Promise<Income> {
    return this.incomeService.update(id, updateIncomeDto, req.user);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string, 
    @Request() req: { user: User }
  ): Promise<void> {
    return this.incomeService.remove(id, req.user);
  }

  @Get('all')
async getAllIncomes(): Promise<Income[]> {
  return this.incomeService.getAllIncomes();
}
}
