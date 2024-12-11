import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Budget } from './entities/budget.entity';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private readonly budgetRepository: Repository<Budget>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


  async create(createBudgetDto: CreateBudgetDto): Promise<Budget> {
    const user = await this.userRepository.findOne({ where: { id: createBudgetDto.userId } });

    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const newBudget = this.budgetRepository.create({
      ...createBudgetDto,
      user,
    });

    return this.budgetRepository.save(newBudget);
  }

 
  async update(id: string, updateBudgetDto: UpdateBudgetDto): Promise<Budget> {
    const budget = await this.budgetRepository.findOne({ where: { id }, relations: ['user'] });

    if (!budget) {
      throw new NotFoundException('Presupuesto no encontrado');
    }

    Object.assign(budget, updateBudgetDto);

    return this.budgetRepository.save(budget);
  }

  // Eliminar un presupuesto
  async remove(id: string): Promise<void> {
    const budget = await this.budgetRepository.findOne({ where: { id } });

    if (!budget) {
      throw new NotFoundException('Presupuesto no encontrado');
    }

    await this.budgetRepository.remove(budget);
  }
}
