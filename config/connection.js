const mysql = require('mysql2')

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "pass",
        database: "employee_tracker_db"
    },
    console.log("Connected to the Employee Tracker Database")
);

module.exports = db