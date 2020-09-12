const { connection } = require('../config/config');
const inquirer = require('inquirer');

const asyncRoles = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM role', (err, res) => {
            if(err) reject(err);
            resolve(res);
        })
    })
}
const asyncEmployees = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM employee', (err, res) => {
            if(err) reject(err);
            resolve(res);
        })
    })
}


const addNewEmployee = async () => {
    // Generate Role List
    let roleList = await asyncRoles();
    const updatedRoles = [];
    roleList.forEach((item) => {
        let newItem = {
            id: item.id,
            name: item.title
        };
        updatedRoles.push(newItem);
    })
    // Generate Employee List
    let employeeList = await asyncEmployees();
    const updatedEmployees = [{id: null, name: 'None'}];
    employeeList.forEach((item) => {
        let newItem = {
            id: item.id,
            name: `${item.first_name} ${item.last_name}`
        };
        updatedEmployees.push(newItem);
    })


    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of the employee?',
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
            name: 'lastName',
            message: 'What is the last name of the employee?',
            validate: function (answer) {
                if(RegExp(/([A-Za-z0-9])\w+/g).test(answer)) {
                    return true;
                } else {
                    return false;
                }
            }
        }, 
        {
            type: 'list',
            name:'role',
            message: `What is the employee's role?`,
            choices: updatedRoles
        },
        {
            type: 'list',
            name:'manager',
            message: `Who is the employee's Manager?`,
            choices: updatedEmployees
        }
    ]).then(({firstName, lastName, role, manager}) => {
        try {
            console.log(firstName, lastName, role, manager);
        } catch(err) {
            console.log(err);
        }
    })
}

module.exports = { addNewEmployee };