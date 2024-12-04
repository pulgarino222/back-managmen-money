import { IsNumber, IsString, IsOptional } from "class-validator";
import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from '../../users/entities/user.entity'; 

@Entity()
export class Income {

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

    @Column()
    @IsString()
    category: string; 
    @Column({ type: 'date' })
    date: Date;

    @ManyToOne(() => User, user => user.incomes)
    user: User; 
}
