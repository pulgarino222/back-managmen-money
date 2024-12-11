import { IsString, IsEnum, IsNumber, IsDate } from 'class-validator';
import { ExpenseCategory } from '../entities/expense.entity';

export class CreateExpenseDto {
  @IsString()
  description: string;

  @IsNumber()
  amount: number;

  @IsEnum(ExpenseCategory)
  category: ExpenseCategory;

  @IsDate()
  date: Date;

  userId: string;  // Este campo es para asociar el gasto con un usuario
}