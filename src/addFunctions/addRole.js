const { connection } = require('../config/config');
const inquirer = require('inquirer');



const asyncQuery = (roleName, roleSalary, id) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [roleName, roleSalary, id], (err, res) =>{
        if(err) reject(err);
        console.log(`Inserting new department...`);
        resolve(res);
      })
    })
  }

const asyncDepartment = () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM department', (err, res) =>{
        if(err) reject(err);
        console.log(`Showing departments...`);
        resolve(res);
      })
    })
  }

const addNewRole = async () => {
    let departments = []
    const updatedDepartments = []
    departments = await asyncDepartment();
    departments.forEach((item) => {
        let newItem = {
            id: item.id,
            name: item.name
        };
        updatedDepartments.push(newItem);
    })
    console.log(updatedDepartments);
    // Add inquirer prompt here to develop new role.
    return inquirer.prompt([
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
    .then(async ({
        roleName,
        roleSalary,
        roleDepartment
    }) => {
        try{
            const { id } = updatedDepartments.find(({name}) => name === roleDepartment)
            await asyncQuery(roleName, roleSalary, id); 
        } catch(err) {
            console.log(err);
        }
    }).catch(err => {
        console.log(err);
    })
    
    
}

module.exports = { addNewRole };