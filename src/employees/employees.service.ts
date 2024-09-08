import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { retry } from 'rxjs';
import {v4 as uuid} from "uuid";

@Injectable()
export class EmployeesService {
  private employees:CreateEmployeeDto[] =[{
    id: uuid(),
    name: "Alberto", 
    lasName: "Costas",
    phoneNumber:"6584526884"
  },{
    id: uuid(),
    name: "Sebas", 
    lasName: "Resendiz",
    phoneNumber:"69758627894"
  }]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id=uuid();
    this.employees.push(createEmployeeDto);
    return this.employees;
  }

  findAll() {
    return `This action returns all employees`;
  }

  findOne(id: string) {
    const employee = this.employees.filter((employee)=>employee.id==id)[0];
    if (!employee) throw new NotFoundException();
    return employee;
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    let employeeTuUpdate=this.findOne(id);
    employeeTuUpdate = {
      ... employeeTuUpdate,
      ... updateEmployeeDto
    }
    if (employeeTuUpdate) throw new NotFoundException();
    this.employees=this.employees.map((employee)=>{
      if (employee.id==id){
        employee=employeeTuUpdate
      }
      return employee
    })
    return employeeTuUpdate
  }

  remove(id: string) {
    this.findOne(id);
    this.employees= this.employees.filter((employee)=>employee.id !=id)
    return this.employees
  }
}
