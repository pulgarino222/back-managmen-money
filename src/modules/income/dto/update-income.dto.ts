import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class UpdateIncomeDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsDateString()
  date?: string;
}