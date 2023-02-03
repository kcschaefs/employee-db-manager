
//only need to update the role per assignment reqs

const updateEmployee = [
  {
    type: 'list',
    name: 'updateChoices',
    message: "What do you need to update?",
    choices: ["First Name", "Last Name", "Role/Title", "Manager's Name"],
  },
  {
    type: 'input',
    name: 'firstName',
    message: "What is the employee's updated first name?",
  },
  {
    type: 'input',
    name: 'lastName',
    message: "What is the employee's updated last name?",
  },
  {
    type: 'list',
    name: 'roleName',
    message: "What is their role/title?",
    choices: [// need to find a way to display the title names here, return the role number into SQL
    ],
  },
  {
    type: 'list',
    name: 'isManager',
    message: "Is this employee a manager?",
    choices: ["yes", "no"],
    // need to find a way to assign employees if yes, choose manager if no
  },
  {
    type: 'list',
    name: 'managerName',
    message: "Who is their manager?",
    choices: [// need to find a way to display the manager names here, return the manager number into SQL
  ],
  },

  //this one may not need to be added, may need to be something different
  {
    type: 'list',
    name: 'assignEE',
    message: "Which employees need to be assigned to this manager?",
    choices: [// need to find a way to assign employees from a list
  ],
  },
];