import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Budget } from './entities/budget.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Budget])],
  controllers: [BudgetController],
  providers: [BudgetService],
})
export class BudgetModule {}
