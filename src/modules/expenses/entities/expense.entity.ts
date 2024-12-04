import { IsNumber, IsString, IsEnum } from "class-validator";
import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from '../../users/entities/user.entity'; 


export enum ExpenseCategory {
    Vivienda = "Vivienda",
    Transporte = "Transporte",
    Alimentacion = "Alimentación",
    Salud = "Salud",
    Educacion = "Educación",
    Entretenimiento = "Entretenimiento",
    Otros = "Otros"
}

@Entity()
export class Expense {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @Column()
    @IsString()
    description: string; 

    @Column('decimal', { precision: 10, scale: 2 })
    @IsNumber()
    amount: number; 

    @Column({
        type: "enum",
        enum: ExpenseCategory,
        default: ExpenseCategory.Otros
    })
    @IsEnum(ExpenseCategory)
    category: ExpenseCategory; 

    @Column({ type: 'date' })
    date: Date; 

    @ManyToOne(() => User, user => user.expenses)
    user: User; 
}
