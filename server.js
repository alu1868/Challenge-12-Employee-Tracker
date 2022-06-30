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
    console.log("Accessing all Employees")
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


// ADD A ROLE


// ADD AN EMPLOYEE


// UPDATE EMPLOYEE


// EXIT APPLICATION
function exit() {
    console.log('Closing Application');
    process.exit();
}