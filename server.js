const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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


app.get('/', (req, res) => res.json(`GET route`));

// Query database
db.query("SELECT * FROM role;", function (err, results) {
  console.log(results)
})

db.query('SELECT * FROM department;', function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
