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


// Query database
db.query("SELECT * FROM role;", function (err, results) {
  console.log(results)
})

// db.query('SELECT * FROM department;', function (err, results) {
//   console.log(results);
// });