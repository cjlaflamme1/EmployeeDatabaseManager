const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employee_management"
});

connection.connect((err) => {
    if(err) {
        console.error(`Error connecting: ${err.stack}`);
        return;
    }
    console.log(`Connect as id ${connection.threadId}`);
})



connection.query(`SELECT * FROM employee`, (err, result) => {
    if(err) throw err;
    console.table(result);
    connection.end();
})