import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ){}

  create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = this.employeeRepository.create(createEmployeeDto);
    return this.employeeRepository.save(employee);
  }

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  findByLocation(id: number){
    return this.employeeRepository.findBy({
      location: {
        locationId: id
      }
    })
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({ employeeId: id });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto
    });
    if (!employeeToUpdate) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return this.employeeRepository.save(employeeToUpdate);
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.employeeRepository.delete({ employeeId: id });
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return {
      message: `El empleado con el id: ${id} ha sido eliminado`
    };
  }
}