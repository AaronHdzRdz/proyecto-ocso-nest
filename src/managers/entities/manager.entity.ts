import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Manager {
    @PrimaryGeneratedColumn()
    managerId: string;
    @Column()
    managerName: string;
    @Column()
    managerSalary: number;
    @Column()
    managerEmail: string;
    @Column()
    managerPhoneNumber: string;
    //relaicon con location
}
