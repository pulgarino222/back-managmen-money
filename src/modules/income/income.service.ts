import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Income } from './entities/income.entity';
import { User } from '../users/entities/user.entity';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { Between } from 'typeorm';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Income)
    private incomeRepository: Repository<Income>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  private getCurrentMonthStart(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1); 
  }

  private getCurrentMonthEnd(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0); 
  }

  private isDateInCurrentMonth(date: Date | string): boolean {
    const currentMonthStart = this.getCurrentMonthStart();
    const currentMonthEnd = this.getCurrentMonthEnd();

    const normalizedDate = new Date(date);
    const normalizedStart = new Date(currentMonthStart.setHours(0, 0, 0, 0));
    const normalizedEnd = new Date(currentMonthEnd.setHours(0, 0, 0, 0));

    return normalizedDate >= normalizedStart && normalizedDate <= normalizedEnd;
  }

  async create(createIncomeDto: CreateIncomeDto): Promise<Income> {
    const user = await this.userRepository.findOne({ where: { id: createIncomeDto.userId } });

    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const newIncome = this.incomeRepository.create({
      ...createIncomeDto,
      user,
      date: new Date(),
    });

    if (!this.isDateInCurrentMonth(newIncome.date)) {
      throw new BadRequestException('El ingreso debe estar dentro del mes actual');
    }

    return await this.incomeRepository.save(newIncome);
  }

  async getIncomesForCurrentMonth(user: User): Promise<Income[]> {
    const currentMonthStart = this.getCurrentMonthStart();
    const currentMonthEnd = this.getCurrentMonthEnd();

    return this.incomeRepository.find({
      where: {
        user,
        date: Between(currentMonthStart, currentMonthEnd),
      },
    });
  }

  async getAllIncomes(): Promise<Income[]> {
    return this.incomeRepository.find({
      relations: ['user'], // Incluye la relación con el User
    });
  }

  async update(id: string, updateIncomeDto: UpdateIncomeDto, user: User): Promise<Income> {
    console.log('Ingreso a actualizar:', id); 
    console.log('Datos de actualización:', updateIncomeDto); 

    const income = await this.incomeRepository.findOne({ where: { id, user } });

    if (!income) {
      throw new NotFoundException('Ingreso no encontrado');
    }

    const currentMonthStart = this.getCurrentMonthStart();
    const currentMonthEnd = this.getCurrentMonthEnd();

    console.log('Fecha original del ingreso:', income.date); 
    if (!this.isDateInCurrentMonth(income.date)) {
      console.log('Ingreso fuera del mes actual'); 
      throw new BadRequestException('El ingreso solo puede actualizarse dentro del mes actual');
    }

    if (updateIncomeDto.date) {
      console.log('Fecha de actualización:', new Date(updateIncomeDto.date)); 
      const updatedDate = new Date(updateIncomeDto.date);

      const formattedDate = updatedDate.toISOString().slice(0, 19).replace('T', ' '); 
      console.log('Fecha de actualización formateada:', formattedDate); 

      if (!this.isDateInCurrentMonth(updatedDate)) {
        console.log('Fecha de actualización fuera del mes actual');
        throw new BadRequestException('El ingreso solo puede actualizarse dentro del mes actual');
      }

      updateIncomeDto.date = formattedDate;
    }

    Object.assign(income, updateIncomeDto);
    return await this.incomeRepository.save(income);
  }

  async remove(id: string, user: User): Promise<void> {
    const income = await this.incomeRepository.findOne({ where: { id, user } });

    if (!income) {
      throw new NotFoundException('Ingreso no encontrado');
    }

    if (!this.isDateInCurrentMonth(income.date)) {
      throw new BadRequestException('Solo puedes eliminar ingresos del mes actual');
    }

    await this.incomeRepository.remove(income);
  }
}
