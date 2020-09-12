const inquirer = require('inquirer');
const cTable = require('console.table');
const { question } = require('./src/questions');
const { addNewRole } = require('./src/addFunctions/addRole');
const { viewAllQuery, addQuery } = require('./src/helperFunc');
const { addNewEmployee } = require('./src/addFunctions/addEmployee');
const addEmployee = require('./src/addFunctions/addEmployee');



const initialInquiry = async () => {
    inquirer.prompt(question).then(async (response) => {
        try{
            switch (response.questionList) {
                case 'View Employees':
                    await viewAllQuery('employee');
                    break;
                case 'View departments':
                    await viewAllQuery('department');
                    break;
                case 'View roles':
                    await viewAllQuery('role');
                    break;
                case 'Exit':
                    process.exit(0);
                case 'Add departments':
                    await addQuery(response.questionList, response);
                    break;
                case 'Add roles':
                    await addNewRole();
                    await viewAllQuery('role');
                    break;
                case 'Add employees':
                    await addNewEmployee();
                    await viewAllQuery('employee');
                    break;
            }
            initialInquiry();
        } catch(err) {
            console.log(err);
            process.exit(1);
        }
    })
}

initialInquiry();