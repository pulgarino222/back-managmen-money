import { IsNumber, IsString } from "class-validator";
import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, ManyToOne, BeforeInsert } from "typeorm";
import { User } from '../../users/entities/user.entity'; 
@Entity()
export class Budget {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date; 

    @Column()
    @IsString()
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    @IsNumber()
    totalAmount: number;

    @Column({ type: 'date' })
    startDate: Date;
    @Column({ type: 'date' })
    endDate: Date; 

    @ManyToOne(() => User, user => user.budgets)
    user: User; 

    @BeforeInsert()
    setStartAndEndDate() {
        
        this.startDate = this.createdAt;
        
        
        const nextMonth = new Date(this.createdAt.getFullYear(), this.createdAt.getMonth() + 1, 0); 
        this.endDate = nextMonth;
    }
}

