const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");
let departments = [];
let roles = [];
let managers = [];
let employees = [];

// Connect to database  -------------------------------------------
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password123',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

// Inital prompts  -------------------------------------------
const options = [
  {
    type: 'list',
    name: 'startOptions',
    message: "What would you like to do?",
    choices: ["View all Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Quit"]
  }
];

// Add department prompts + functionality  -------------------------------------------
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

// Add role prompt + functionality  -------------------------------------------
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
    // console.log(JSON.stringify(roleAnswers));
    const selectedDept = departments.filter(dep => dep.dept_name === roleAnswers.deptName)[0];
    // console.log(JSON.stringify(selectedDept));
    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`, [roleAnswers.title, roleAnswers.salary, selectedDept.department], function (err, results) {
      if (err) {
        console.log(err);
      } else console.log("Role Added!");
      roles.push({ "title": roleAnswers.title }, { "salary": roleAnswers.salary }, { "department": selectedDept.department });
      askUser();
    });
  });
};

const roleChoices = () => {
  return roles.map(role => role.title);
};

// Add employee prompt + functionality  -------------------------------------------
function getAddEmployeeQuestions() {
  return [
    {
      type: 'input',
      name: 'firstName',
      message: "What is the employee's first name?",
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the employee's last name?",
    },
    {
      type: 'list',
      name: 'roleName',
      message: "What is their role/title?",
      choices: roleChoices()
    },
    {
      type: 'list',
      name: 'managerName',
      message: "Who is their manager?",
      choices: managerChoices()
    },
  ]
};

const managerChoices = () => {
  console.log(JSON.stringify(managers));
  return managers.map(employee => (employee.first_name + " " + employee.last_name));
};

function addEmloyee() {
  inquirer.prompt(getAddEmployeeQuestions()).then(eeAnswers => {
    // console.log(JSON.stringify(eeAnswers));
    const selectedRole = roles.filter(role => role.title === eeAnswers.roleName)[0];
    const selectedManager = managers.filter(employee => (employee.first_name + " " + employee.last_name) === eeAnswers.managerName)[0];
    // console.log(JSON.stringify(selectedManager));
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?, ?)`, [eeAnswers.firstName, eeAnswers.lastName, selectedRole.id, selectedManager.manager_id], function (err, results) {
      if (err) {
        console.log(err);
      } else console.log("Employee Added!");
      managers.push({ "first_name": eeAnswers.firstName }, { "last_name": eeAnswers.lastName }, { "role": selectedRole.title }, { "manager": selectedManager.managerName });
      askUser();
    });
  });
};

// Update employee prompts + functionality


const employeeChoices = () => {
  console.log(JSON.stringify(employees));
  return employees.map(employee => (employee.first_name + " " + employee.last_name));
};

function getUpdateEmployeeQuestions () {
  return [
  {
    type: 'list',
    name: 'employeeName',
    message: "Which employee would you like to update?",
    choices: employeeChoices()
  },
  {
    type: 'list',
    name: 'roleName',
    message: "What is their new role/title?",
    choices: roleChoices()
  }
];
} 

function updateEmloyee() {
  console.log(JSON.stringify(getUpdateEmployeeQuestions()));
  inquirer.prompt(getUpdateEmployeeQuestions()).then(eeUpdateAnswers => {
    const selectedRole = roles.filter(role => role.title === eeUpdateAnswers.roleName)[0];
    db.query(`UPDATE employee (id,role_id) VALUES (?,?)`, [eeUpdateAnswers.id, selectedRole.id], function (err, results) {
      if (err) {
        console.log(err);
      } else console.log("Role Updated!");
      askUser();
    });
  })
};


// User prompts -------------------------------------------
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
    } else if (optionsAnswers.startOptions === "Add an Employee") {
      addEmloyee();
    } else if (optionsAnswers.startOptions === "Update an Employee Role") {
      updateEmloyee();
    } else {
      db.end();
    }
  });
}

// Queries to grab cached data  -------------------------------------------
function queryDept() {
  db.query(`SELECT dept_name,id AS department FROM department;`, function (err, results) {
    departments = results;
    queryRole();
  })
};

function queryRole() {
  db.query(`SELECT title,id FROM role;`, function (err, results) {
    roles = results;
    // console.log(JSON.stringify(roles));
    queryManager();
  })
};

function queryManager() {
  db.query(`SELECT first_name,last_name,id FROM employee WHERE manager_id IS null;`, function (err, results) {
    managers = results;
    queryEmployee();
  })
};

function queryEmployee() {
  db.query(`SELECT first_name,last_name,id FROM employee;`, function (err, results) {
    employees = results;
    askUser();
  })
};

// Cache from DB and initialize prompts  -------------------------------------------
function init() {
  queryDept();
};

init();