const mysql = require('mysql');

const connection = mysql.createdConnection({
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