import { Controller, Get, Post, Body, Param,  Delete, Request, Patch } from '@nestjs/common';
import { ExpenseService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { User } from '../users/entities/user.entity';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async create(@Body() createExpenseDto: CreateExpenseDto): Promise<Expense> {
    return this.expenseService.create(createExpenseDto);
  }

  @Get('all')
  async getAllExpenses(): Promise<Expense[]> {
    return this.expenseService.getAllExpenses();
  }

  @Get('user')
  async getExpensesForUser(@Request() req: { user: User }): Promise<Expense[]> {
    return this.expenseService.getExpensesForUser(req.user);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
    @Request() req: { user: User }
  ): Promise<Expense> {
    return this.expenseService.update(id, updateExpenseDto, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: { user: User }): Promise<void> {
    return this.expenseService.remove(id, req.user);
  }
}

