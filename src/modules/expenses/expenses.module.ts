import { Module } from '@nestjs/common';
import { ExpenseService } from './expenses.service';
import { ExpenseController } from './expenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Expense } from './entities/expense.entity';
import { Income } from '../income/entities/income.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Expense,User])],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpensesModule {}
