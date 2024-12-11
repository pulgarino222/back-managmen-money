import { IsString, IsEnum, IsNumber, IsOptional, IsDate } from 'class-validator';
import { ExpenseCategory } from '../entities/expense.entity';

export class UpdateExpenseDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsEnum(ExpenseCategory)
  @IsOptional()
  category?: ExpenseCategory;

  @IsOptional()
  @IsDate()
  date?: Date;
}