USE company_db;

INSERT INTO department (dept_name)
VALUES ("Sales"),
       ("Accounting"),
       ("Operations"),
       ("HR");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Rep", 150000.00, 1),
       ("Staff Accountant", 90000.00, 2),
       ("Fulfillment Specialist", 70000.00, 3),
       ("Operations Manager", 200000.00, 3),
       ("HR Generalist", 80000.00, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Gail", "Grape", 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joy", "Jones", 1, 1),
       ("Harry", "Henderson", 2, 1),
       ("Eric", "Engel", 3, 1),
       ("Mary", "Masters", 5, 1);
       