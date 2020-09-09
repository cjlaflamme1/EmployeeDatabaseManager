const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');
const {question} = require('./util/questions');

const connection = mysql.createConnection({
    host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employee_management"
});

// const connect = () => {
//     return connection.connect((err) => {
//         if(err) {
//             console.error(`Error connecting: ${err.stack}`);
//             return;
//         }
//         console.log(`Connect as id ${connection.threadId}`);
// });
// }
// connect();
const viewAllQuery = (table) => {
    return connection.query('SELECT * FROM ??', [table], (err, result) => {
        if(err) throw err;
        console.table(result);
        initialInquiry();
    });
}
const initialInquiry = () => {
    inquirer.prompt(question).then(({questionList}) => {
        switch(questionList) {
            case 'View Employees':
                viewAllQuery('employee');
                break;
            case 'View departments':
                viewAllQuery('department');
                break;
            case 'View roles':
                viewAllQuery('role');
                break;
            case 'Exit':
                connection.end();
                return;
        }
    })
}
initialInquiry();