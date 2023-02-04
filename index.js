const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password123',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

const options = [
  {
    type: 'list',
    name: 'startOptions',
    message: "What would you like to do?",
    choices: ["View all Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role"]
  }
];

function askUser(){
  inquirer.prompt(options).then(optionsAnswers=>{
    if(optionsAnswers.startOptions==="View all Departments"){
      db.query("SELECT dept_name AS 'dept name' FROM department;", function (err, results) {
        console.table(results);
        askUser();
      })
      } else if(optionsAnswers.startOptions==="View All Roles"){
        db.query("SELECT role.title AS title, role.salary AS salary, department.dept_name AS department FROM role JOIN department ON role.department_id=department.id;", function (err, results) {
          console.table(results);
          askUser();
        })
      } else if(optionsAnswers.startOptions==="View All Employees"){
        db.query("SELECT employee.first_name AS 'first name', employee.last_name AS 'last name', role.title AS title FROM employee JOIN role ON employee.role_id=role.id;", function (err, results) {
          console.table(results);
          askUser();
        })
      }
    });
  }

askUser();