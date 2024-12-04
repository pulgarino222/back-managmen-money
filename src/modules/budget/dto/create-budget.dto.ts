import { IsNumber, IsString, IsDateString, IsUUID } from 'class-validator';

export class CreateBudgetDto {
  @IsString()
  description: string;

  @IsNumber()
  totalAmount: number;

  @IsUUID()
  userId: string
}
