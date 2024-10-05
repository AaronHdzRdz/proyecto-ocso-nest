import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";
import { Employee } from "../entities/employee.entity";
import { Location } from "src/locations/entities/location.entity";

export class CreateEmployeeDto extends Employee {
    @IsString()
    @MaxLength(30)
    name: string; 
    @IsString()
    @MaxLength(70)
    lastName: string;
    @IsString()
    @MaxLength(10)
    phoneNumber: string
    @IsString()
    @IsEmail()
    email: string;
    @IsOptional()
    @IsString()
    location: Location;
    @IsOptional()
    emplyeePhoto: string;
}
