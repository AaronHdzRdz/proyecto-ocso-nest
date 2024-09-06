import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { retry } from 'rxjs';

@Injectable()
export class EmployeesService {
  private employees:CreateEmployeeDto[] =[{
    id: 1,
    name: "Alberto", 
    lasName: "Costas",
    phoneNumber:"6584526884"
  },{
    id: 2,
    name: "Sebas", 
    lasName: "Resendiz",
    phoneNumber:"69758627894"
  }]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id=this.employees.length+1;
    this.employees.push(createEmployeeDto);
    return this.employees;
  }

  findAll() {
    return `This action returns all employees`;
  }

  findOne(id: number) {
    const employee = this.employees.filter((employee)=>employee.id==id)[0];
    return employee;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    let employeeTuUpdate=this.findOne(id);
    employeeTuUpdate = {
      ... employeeTuUpdate,
      ... updateEmployeeDto
    }
    this.employees=this.employees.map((employee)=>{
      if (employee.id==id){
        employee=employeeTuUpdate
      }
      return employee
    })
    return employeeTuUpdate
  }

  remove(id: number) {
    this.employees= this.employees.filter((employee)=>employee.id !=id)
    return this.employees
  }
}
