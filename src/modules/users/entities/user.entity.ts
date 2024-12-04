import { IsEmail, IsNumber, IsString } from "class-validator";
import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Role } from '../../../auth/entities/roles.entity';
import { Income } from "src/modules/income/entities/income.entity";
import { Expense } from "src/modules/expenses/entities/expense.entity";
import { Budget } from "src/modules/budget/entities/budget.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @Column()
    fullName: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    password: string;

    @Column({ type: 'bigint' })
    @IsNumber()
    phone: number;

    
    @ManyToMany(() => Role, role => role.users)
    @JoinTable() 
    roles: Role[];

    @OneToMany(() => Income, income => income.user)
    incomes: Income[];

    @OneToMany(() => Expense, expense => expense.user)
    expenses: Expense[];

    @OneToMany(() => Budget, budget => budget.user)
    budgets: Budget[]
}
