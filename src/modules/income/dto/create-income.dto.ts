import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';

export class CreateIncomeDto {
  @IsString()
  description: string;

  @IsNumber()
  amount: number;

  @IsString()
  category: string;

  @IsDate()
  date: Date;

  @IsOptional()
  @IsString()
  userId: string;  // Asegúrate de que el userId esté presente
}
