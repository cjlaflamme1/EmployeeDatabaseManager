const { connection } = require('../config/config');
const inquirer = require('inquirer');
const { promisify } = require('util');
const query = promisify(connection.query).bind(connection);
const {  viewAllQuery, initialInquiry } = require('../../app');


const addNewRole = async () => {
    let departments = []
    const updatedDepartments = []
    departments = await query('SELECT * FROM department')
    await departments.forEach((item) => {
        let newItem = {
            id: item.id,
            name: item.name
        };
        updatedDepartments.push(newItem);
    })
    console.log(updatedDepartments);
    // Add inquirer prompt here to develop new role.
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the name of the new role?',
            validate: function (answer) {
                        if(RegExp(/([A-Za-z0-9])\w+/g).test(answer)) {
                            return true;
                        } else {
                            return false;
                        }
                    }
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary of the new role? ',
            validate: function (answer) {
                        if(RegExp(/([0-9])\w+/g).test(answer)) {
                            return true;
                        } else {
                            return false;
                        }
                    }
        },
        {
            type: 'list',
            name:'roleDepartment',
            message: 'What is the department of the new role?',
            choices: updatedDepartments
        } 

    ])
    .then(({
        roleName,
        roleSalary,
        roleDepartment
    }) => {
        const { id } = updatedDepartments.find(({name}) => name === roleDepartment)
        query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [roleName, roleSalary, id], (err, result) => {
            if(err) throw err;
            console.log(`Adding ${roleName} to the role database.`)
            // This function below is the one that will not work while inside this function.
            // None of the functions in app.js will work within this addNewRole function
            // If I move this entire function over to app.js, everything works fine.  I think I need to wrap the functions in app.js differently? 
           viewAllQuery();
        })
     
    
    }).catch(err => {
        console.log(err);
    })
    
    
}

module.exports = { addNewRole };