const mysql = require('mysql2')
require('dotenv').config()

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "pass",
        database: "employee_tracker_db"
    }
);

module.exports = db