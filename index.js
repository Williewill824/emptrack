const mysql = require("mysql");
const inquirer = require("inquirer");


const connection = mysql.createConnection({
  host: "localhost",

  
  port: 3306,

  
  user: "root",

  
  password: "password",
  database: "employees",
});

connection.connect(function (err) {
  if (err) throw err;
  
  start();
});

function start() {
  inquirer
    .prompt({
      name: "userInput",
      type: "list",
      message:
        "Would you like to view [VIEW DEPARTMENTS], [VIEW ROLES], [VIEW EMPLOYEES], [ADD DEPARTMENTS], [ADD ROLES], [ADD EMPLOYEES], [UPDATE EMPLOYEE ROLE] [EXIT]?",
      choices: ["VIEW_DEPARTMENTS", "VIEW_ROLES", "VIEW_EMPLOYEES", "ADD_DEPARTMENTS", "ADD_ROLES", "ADD_EMPLOYEES", "UPDATE_EMPLOYEE_ROLE", "EXIT"],
    })
    .then(function (answer) {
      switch (answer.userInput){

          case "VIEW_DEPARTMENTS":
            viewDepartments()
            break;
          case "VIEW_ROLES":
            viewRoles()
            break;
          case "VIEW_EMPLOYEES":
            viewEmployees()
            break;
          case "ADD_DEPARTMENTS":
            addDepartment()
            break;
          case "ADD_ROLES":
            addRole()
            break;
          case "ADD_EMPLOYEES":
            addEmployee()
            break;
          case "UPDATE_EMPLOYEE_ROLE":
            update_Employee()
            break;
          default:
            connection.end();
      }
})
}
function backToStart() {
  inquirer
    .prompt({
      name: "userInput",
      type: "list",
      message:
        "Would you like to return to main menu?",
      choices: ["MAIN_MENU", "EXIT"],
    })
    .then(function (answer) {
      if (answer.userInput === "MAIN_MENU") {
        start();
      } else {
        connection.end();
      }
    });
}
function viewDepartments() {
  connection.query("SELECT * FROM department", (err, results) => {
    if (err) throw err;
    console.table(results);
    backToStart();
    
  });
}

function viewRoles() {
  connection.query(
    `select title, salary, name from role 
    inner join department on role.department_id=department.id`,
    function (err, results) {
      if (err) throw err;
      console.table(results);
      backToStart();
    }
  );
}

function viewEmployees() {
  connection.query(
    `select first_name, last_name, title, salary, name from employee 
    inner join role on employee.role_id=role.id 
    inner join department on role.department_id=department.id`,
    function (err, results) {
      if (err) throw err;
      console.table(results);
      backToStart();
    }
  );
}

function printResults (err, result) {
    if (err) throw err;
    console.log(result);
    start();
}

async function addDepartment () {

    const department = await inquirer.prompt([
        {
            name: "name",
            message: "What is the name of the department"
        }
    ])

    connection.query (`insert into department (name) values ('${department.name}')`, printResults )
}

function addRole() {
    connection.query ("select * from department", async (err, results) => {

        const departments = results.map ( (result) => ({
            name:result.name, 
            value:result.id
        }) )

        const roleInfo = await inquirer.prompt([
            {
                name: "title",
                message: "What is the title for the position"
            },
            {
                name: "salary",
                message: "What is the salary for the position"
            },
            {
                type: "list",
                name: "department_id",
                message: "Which Department does the role belong to?",
                choices:departments 
            }
        ])

        connection.query (`insert into role (title, salary, department_id) values('${roleInfo.title}','${roleInfo.salary}','${roleInfo.department_id}' )`, printResults)

    })
}

function addEmployee() {
    connection.query ("select * from role", async (err, results) => {

        const roles = results.map ( (result) => ({
            name:result.title, 
            value:result.id
        }) )

        const employeeInfo = await inquirer.prompt([
            {
                name: "first_name",
                message: "What is the first name of the employee"
            },
            {
                name: "last_name",
                message: "What is the last name of the employee"
            },
            {
                type: "list",
                name: "role_id",
                message: "What is the employee's role?",
                choices:roles 
            }
        ])

        connection.query (`insert into employee (first_name, last_name, role_id) values('${employeeInfo.first_name}','${employeeInfo.last_name}','${employeeInfo.role_id}' )`, printResults)

    })
}

function update_Employee() {

    connection.query("select * from employee", (err, employees)  => {

        connection.query ("select * from role", async function(err, roles) {

            const roleChoices = roles.map ( (role) => ({
                name:role.title, 
                value:role.id
            }) )

            const employeeChoices = employees.map ( (employee) => ({
                name:employee.first_name + " " + employee.last_name, 
                value:employee.id
            }) )

            const updateEmployee = await inquirer.prompt([
                {
                    type: "list",
                    name: "employee_id",
                    message: "Which employee would you like to udate?",
                    choices:employeeChoices 
                },
                {
                    type: "list",
                    name: "role_id",
                    message: "What would you like their new role to be?",
                    choices:roleChoices 
                }
            ])

            connection.query (`update employee set role_id=${updateEmployee.role_id} where id=${updateEmployee.employee_id}`, printResults)

        })

    })

  }