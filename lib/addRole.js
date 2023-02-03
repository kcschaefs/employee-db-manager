const addRole = [
  {
    type: 'input',
    name: 'title',
    message: "What is the new role/title?",
  },
  {
    type: 'input',
    name: 'salary',
    message: "What is the salary for this role?",
  },
  {
    type: 'list',
    name: 'deptName',
    message: "What is the department?",
    choices: [// need to find a way to display the department names here, return the department number into SQL
    ],
  }
];

