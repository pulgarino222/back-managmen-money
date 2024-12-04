import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { User } from '../users/entities/user.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';  // Crea este DTO para manejar la entrada
import { UpdateExpenseDto } from './dto/update-expense.dto';  // Crea este DTO para manejar las actualizaciones

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  // Método para crear un gasto
  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const user = await this.userRepository.findOne({ where: { id: createExpenseDto.userId } });

    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const newExpense = this.expenseRepository.create({
      ...createExpenseDto,
      user,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await this.expenseRepository.save(newExpense);
  }

  // Método para obtener todos los gastos con la relación de usuario
  async getAllExpenses(): Promise<Expense[]> {
    return this.expenseRepository.find({
      relations: ['user','user.incomes'], // Incluye la relación con el usuario
    });
  }

  // Método para obtener los gastos de un usuario específico
  async getExpensesForUser(user: User): Promise<Expense[]> {
    return this.expenseRepository.find({
      where: { user },
      relations: ['user'],
    });
  }

  // Método para actualizar un gasto
  async update(id: string, updateExpenseDto: UpdateExpenseDto, user: User): Promise<Expense> {
    const expense = await this.expenseRepository.findOne({ where: { id, user } });

    if (!expense) {
      throw new NotFoundException('Gasto no encontrado');
    }

    Object.assign(expense, updateExpenseDto);
    expense.updatedAt = new Date(); // Actualiza la fecha de modificación

    return await this.expenseRepository.save(expense);
  }

  // Método para eliminar un gasto
  async remove(id: string, user: User): Promise<void> {
    const expense = await this.expenseRepository.findOne({ where: { id, user } });

    if (!expense) {
      throw new NotFoundException('Gasto no encontrado');
    }

    await this.expenseRepository.remove(expense);
  }
}
