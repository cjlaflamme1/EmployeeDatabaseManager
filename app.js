const inquirer = require('inquirer');
const cTable = require('console.table');
const { question } = require('./src/questions');
const { connection } = require('./src/config/config');


const addQuery = (table, answerObject) => {
    switch(table) {
        case 'Add departments':
            connection.query('INSERT INTO department SET ?', [{name: answerObject.departmentName}], (err, res) =>{
                if(err) throw err;
                console.log(`Inserting new department...`);
            })
            viewAllQuery('department');
            break;

    }
} 

const viewAllQuery = (table) => {
    connection.query('SELECT * FROM ??', [table], (err, result) => {
        if(err) throw err;
        console.table(result);
        initialInquiry();
    });
}

const initialInquiry = () => {
    inquirer.prompt(question).then((response) => {
        switch(response.questionList) {
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
            case 'Add departments':
                addQuery(response.questionList, response);
                break;
        }
    })
}
initialInquiry();