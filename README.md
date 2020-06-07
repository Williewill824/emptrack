# Phase 1

## Build DB
* **department**:
  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name
* **role**:
  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to
* **employee**:
  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has

# Phase 2

## Setup and read data
* npm init
* npm install mysql inquirer
* mysql connection/connect
* prompt user - view department, view roles, view employees, exit
* based on what they chose, call the appropriate function
* view departments - select * from departments
* view roles - select * from roles
* view employees - select * from employee
* exit - close connnection

# Phase 3

## Add data
1. update initial prompt and ask use what they want to input
2. add department
*  a) ask the user for a name 
*  b) insert name into department
3. add role
*  a) get all departments
*  b) ask user which department
*  c) ask the user for title and salary
*  d) insert title, salary, department_id into role
4. add employee
*  a) get all roles
*  b) ask user which role
*  c) ask user for first_name, last_name
*  d) insert first_name, last_name, role_id into employee

# Phase 4

## Update data
1. update initial prompt by adding option to update employee's role
2. update role
*  a) get all employees
*  b) get all roles
*  c) ask user which employee
*  d) ask user what's the new role
*  e) update employee's role in the employee table