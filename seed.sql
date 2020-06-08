insert into department  (name)
values ('Sales'),('Engineering'),('Finance'),('Legal');

select * from department; 

insert into role (title, salary, department_id)
values ('Sales Lead',100000,1), ('Technician',500000,2),('Accountant',120000,3),('Lawyer',150000,4);

select * from role;

insert into employee (first_name, last_name, role_id)
values ('John','Doe',1),('Gabe','Hernandez',2),('Ralhp','Lauren',3),('Louis','Vuitton',4);

select * from employee;

select title, salary, name from role 
inner join department on role.department_id=department.id;

select first_name, last_name, title, salary, name from employee 
inner join role on employee.role_id=role.id 
inner join department on role.department_id=department.id;