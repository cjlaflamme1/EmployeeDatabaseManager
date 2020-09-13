const inquirer = require('inquirer');
const cTable = require('console.table');
const { question } = require('./src/questions');
const { addNewRole } = require('./src/addFunctions/addRole');
const { viewAllQuery, addQuery } = require('./src/helperFunc');
const { addNewEmployee } = require('./src/addFunctions/addEmployee');
const addEmployee = require('./src/addFunctions/addEmployee');
const { updateRole } = require('./src/updateFunctions/updateRole');
const { viewEmployees } = require('./src/renderListFunc/viewEmployees');


const initialInquiry = async () => {
    inquirer.prompt(question).then(async (response) => {
        try{
            switch (response.questionList) {
                case 'View Employees':
                    // This function provides the basic Table view
                    
                    // await viewAllQuery('employee');

                    // This function provides a view that replaces IDs with actual title. 
                    await viewEmployees();
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
                case 'Update Employee Role':
                    // function updating role here
                    await updateRole();
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