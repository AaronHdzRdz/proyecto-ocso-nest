import { Location } from "src/locations/entities/location.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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
    @OneToOne(() => Location)
    location: Location;
}
