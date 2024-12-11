import { Controller, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { Budget } from './entities/budget.entity';

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  // Crear un presupuesto
  @Post()
  async create(@Body() createBudgetDto: CreateBudgetDto): Promise<Budget> {
    return this.budgetService.create(createBudgetDto);
  }

  // Actualizar un presupuesto
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ): Promise<Budget> {
    return this.budgetService.update(id, updateBudgetDto);
  }

  // Eliminar un presupuesto
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.budgetService.remove(id);
  }
}
