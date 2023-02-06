const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");
let departments = [];

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

// Inital prompts
const options = [
  {
    type: 'list',
    name: 'startOptions',
    message: "What would you like to do?",
    choices: ["View all Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Quit"]
  }
];

// Add department prompts + functionality
const addDeptQuestions = [
  {
    type: 'input',
    name: 'dept_name',
    message: "Name of Department",
  }
]

function addDept() {
  inquirer.prompt(addDeptQuestions).then(deptAnswers => {
    let deptAdd = deptAnswers.dept_name;
    db.query(`INSERT INTO department (dept_name) VALUES (?)`, [deptAdd], function (err, results) {
      if (err) {
        console.log(err);
      } else console.log("Department Added!");
      departments.push({ "department": deptAdd })
      askUser();
    })
  });
};

const departmentChoices = () => {
  return departments.map(dep => dep.dept_name);
};

// Add role prompt + funcctionality
function getAddRoleQuestions() {
  return [
    {
      type: 'input',
      name: 'title',
      message: "What is name of the new role/title?",
    },
    {
      type: 'input',
      name: 'salary',
      message: "What is the salary for this role? (Enter as number only)",
    },
    {
      type: 'list',
      name: 'deptName',
      message: "What is the department?",
      choices: departmentChoices()
    }
  ]
}

function addRole() {
  inquirer.prompt(getAddRoleQuestions()).then(roleAnswers => {
    console.log(JSON.stringify(roleAnswers));
    const selectedDept = departments.filter(dep => dep.dept_name === roleAnswers.deptName)[0];
    console.log(JSON.stringify(selectedDept));
    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`, [roleAnswers.title, roleAnswers.salary, selectedDept.department], function (err, results) {
      if (err) {
        console.log(err);
      } else console.log("Role Added!");
      askUser();
    });
  });
};

// User prompts
function askUser() {
  inquirer.prompt(options).then(optionsAnswers => {
    if (optionsAnswers.startOptions === "View all Departments") {
      db.query("SELECT dept_name AS 'dept name' FROM department;", function (err, results) {
        console.table(results);
        askUser();
      })
    } else if (optionsAnswers.startOptions === "View All Roles") {
      db.query("SELECT role.title AS title, role.salary AS salary, department.dept_name AS department FROM role JOIN department ON role.department_id=department.id;", function (err, results) {
        console.table(results);
        askUser();
      })
    } else if (optionsAnswers.startOptions === "View All Employees") {
      db.query("SELECT employee.first_name AS 'first name', employee.last_name AS 'last name', role.title AS title FROM employee JOIN role ON employee.role_id=role.id;", function (err, results) {
        console.table(results);
        askUser();
      })
    } else if (optionsAnswers.startOptions === "Add a Department") {
      addDept();
    } else if (optionsAnswers.startOptions === "Add a Role") {
      addRole();
    }




    else {
      db.end();
    }
  });
}

// Cache from DB and initialize prompts
function init() {
  db.query(`SELECT dept_name,id AS department FROM department;`, function (err, results) {
    // console.table(results);
    //results == department;
    departments = results;
    console.log(results)
    askUser();
  });
  // console.log(results[0])
  // return results[0];
}

init();