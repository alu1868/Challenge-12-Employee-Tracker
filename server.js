const db = require('./config/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');


// Main Menu Prompt
const menu = () => {
    inquirer
    .prompt([
        {
            type: "list",
            name: "choice",
            message: "Choose an option",
            choices: [
                "VIEW DEPARTMENTS",
                "VIEW ROLES",
                "VIEW EMPLOYEES",
                "ADD DEPARTMENT",
                "ADD ROLE",
                "ADD EMPLOYEE",
                "UPDATE EMPLOYEE",
                "EXIT"
            ]
        }
    ])
    .then((answer) => {
        let { choice } = answer

        if (choice == "VIEW DEPARTMENTS") {
            view_departments();
        } else if (choice == "VIEW ROLES") {
            view_roles();
        } else if (choice == "VIEW EMPLOYEES") {
            view_employees();
        } else if (choice == "ADD DEPARTMENT") {
            add_department();
        } else if (choice == "ADD ROLE") {
            add_role();
        } else if (choice == "ADD EMPLOYEE") {
            add_employee();
        } else if (choice == "UPDATE EMPLOYEE") {
            update_employee();
        } else if (choice == "EXIT") {
            exit();
        }
    })
}

// View ALL DEPARTMENTS
const view_departments = () => {
    console.log("Accessing all Departments")
    let sql = `SELECT department_name FROM departments`
    dbCon.promise().query(sql)
        .then(([rows]) => {
            console.log("---------------")
            console.log(rows)
            console.log("---------------")
            menu();
        })
}

// View ALL ROLES
const view_roles = () => {
    console.log("Accessing all Roles")
    let sql = `SELECT title, salary, department_id FROM roles`
    dbCon.promise().query(sql)
        .then(([rows]) => {
            console.log("---------------")
            console.log(rows)
            console.log("---------------")
            menu();
        })
}

// VIEW ALL EMPLOYEES
const view_employees = () => {
    console.log("Accessing all Employees");
    let sql = `SELECT first_name, last_name, role_id, manager_id FROM employee`
    dbCon.promise().query(sql)
        .then(([rows]) => {
            console.log("---------------")
            console.log(rows)
            console.log("---------------")
            menu();
        })
}

// ADD A DEPARTMENT
const add_department = () => {
    console.log('Adding New Department');
    inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'What is the name of your new department?',
            validate: department_name => {
                if (department_name) {
                    return true;
                } else {
                    console.log('Please type in a department name');
                    return false;
                }
            }
        }
    ])
    .then((answers) => {
        const { department } = answers;
        db.promise().query()(
            `INSERT INTO department (department_name) VALUES ('${department})`
        );
        view_departments();
    })
}

// ADD A ROLE
const add_role = () => {
    console.log('Adding New Role');
    db.promise()
    .query('SELECT * FROM department')
    .then(([rows]) => {
        const department_choice = rows.map(({ department_name, id }) => ({name: department_name, value: id}));
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of your new Role?',
                validate: role_name => {
                    if (role_name) {
                        return true;
                    } else {
                        console.log('Please type in a role name');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of your new Role?',
                validate: role_salary => {
                    if (role_salary) {
                        return true;
                    } else {
                        console.log('Please type in a role salary');
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'What department id does your role belong to?',
                choices: department_choice
            }
        ])
        .then((answers) => {
            const role_details = [answers.title, answers.salary, answers.department_id]
            const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;

            db.promise()
            .query(sql,role_details)
            .then(([rows]) => {
                view_roles()
            })
        })
    })
}

// ADD AN EMPLOYEE
const add_employee = () => {
    db.promse()
    .query('SELECT * FROM role')
    .then(([rows]) =>{
        const role_choice = rows.map(({id, title}) => ({ name: title, value: id }));

        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the first name of the employee?',
                validate: (employee_fName) => {
                    if (employee_fName) {
                        return true;
                    } else {
                        console.log('Please type in Employee first name');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the last name of the employee?',
                validate: (employee_lName) => {
                    if (employee_lName) {
                        return true;
                    } else {
                        console.log('Please type in Employee last name');
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'role_id',
                message: "What is the employee's Role?",
                choices: roles_choice
            }
        ])
        .then((answers) => {
            const employee_details = [answers.employee_fName, answers.employee_lName, answers.role_id];
            const sql = `INSERT INTO role (first_name, last_name, role_id) VALUES (?, ?, ?)`;
            
            db.promise()
                .query(sql, employee_details)
                .then(([rows]) => {
                    view_employees();
                })
        })
    })
}

// UPDATE EMPLOYEE
const update_employee = () => {
    db.promise()
    .query('SELECT * FROM employee')
    .then(([rows]) => {
        const employee_choice = rows.map(({ id, first_name, last_name }) => ({
            name: first_name + " " + last_name,
            value: id
        }))

        inquirer.prompt([
            {
                type: "list",
                name: "update_worker",
                message: "Pick employee to update",
                choices: employee_choice
            }
        ])

        .then((answers) => {
            const update = [];
            db.promise()
            .query(`SELECT * FROM employee WHERE id= ${answers.update_worker}`)
            .then((answers) => {
                db.promise()
                .query('SELECT * FROM role')
                .then(([rows]) => {
                    const role_choice = rows.map(({ title, id }) => ({
                        name: title,
                        value: id
                    }))

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'newRole',
                            message: 'What is their new role?',
                            choices: role_choice
                        }
                    ])
                    .then((answers) => {
                        const role_id = answers.newRole;
                        const sql = `UPDATE emplyee SET role_id = ? where id = ?`;

                        update.push(role_id);
                        update.push(answers.update_worker)

                        db.promise()
                        .query(sql, update)
                        .then(({ rows }) => {
                            view_employees
                        })
                    })
                })
            })
        })
    })
}

// EXIT APPLICATION
function exit() {
    console.log('Closing Application');
    process.exit();
}