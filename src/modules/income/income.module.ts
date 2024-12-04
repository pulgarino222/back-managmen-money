import { Module } from '@nestjs/common';
import { IncomeService } from './income.service';
import { IncomeController } from './income.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Income } from './entities/income.entity';
import { Expense } from '../expenses/entities/expense.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Income])],
  controllers: [IncomeController],
  providers: [IncomeService],
})
export class IncomeModule {}
