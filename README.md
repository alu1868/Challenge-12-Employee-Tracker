# Employee Tracker

## Table of Contents
1. [User Story](#user-story)
2. [Acceptance Criteria](#acceptance-criteria)
3. [Description](#description)
4. [Installation](#installation)
5. [Demo](#demo) 
6. [Questions](#questions)

# User Story
    AS A business owner
    I WANT to be able to view and manage the departments, roles, and employees in my company
    SO THAT I can organize and plan my business

# Acceptance Criteria 
    Given a command-line application that accepts user input

    WHEN I start the application 
    THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

    WHEN I choose to view all departments
    THEN I am presented with a formatted table showing department names and department ids

    WHEN I choose to view all roles
    THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

    WHEN I choose to view all employees
    THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

    WHEN I choose to add a role
    THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

    WHEN I choose to add an amployee
    THEN I am prompted to enter the employee's first name, last name, role, and manager, and that employee is added to the database

    WHEN I choose to update an employee role
    THEN I am prompted to select anemployee to update and their ne wrole and this information is updated in the database

# Description
    Application that track employees and roles

# Installation
    ensure you are in the correct directory in your terminal. Proceed to run a 'npm install', then log into your mysql and source the 'db/schema.sql' and 'db/seeds.sql'. Next choose the database by using 'use employee_tracker_db;'. You can choose to see all the currently existing data in the terminals if you so choose to. Once finished leave mysql, and run 'node server.js' in your terminal to start the program.

# Demo
https://drive.google.com/file/d/1Bki939p8t0L-ObbRjvAJCBU4FI1Be91i/view?usp=sharing

# Questions
  For further questions, you can reach out to me by:
  email: alu1868@gmail.com
  GitHub: github.com/alu1868
