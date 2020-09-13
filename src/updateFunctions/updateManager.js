const { connection } = require('../config/config');
const inquirer = require('inquirer');
const { asyncRoles, asyncEmployees } = require('../addFunctions/addEmployee');

const asyncQuery = (manager, employee) => {
    return new Promise ((resolve, reject) => {
        connection.query('UPDATE employee SET manager_id = ? WHERE id = ?', [manager, employee], (err, data) => {
            if(err) reject(err);
            resolve(data);
        })
    })
}

const updateManager = async () => {
    const employeeList = await asyncEmployees();
    const newEmployeeList = [];
    const newManagerList = [{id: null, name: 'No Manager'}];
    employeeList.forEach((item) => {
        let newItem = {
            id: item.id,
            name: `${item.first_name} ${item.last_name}`
        };
        newEmployeeList.push(newItem);
        newManagerList.push(newItem);
    })

    return inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: `Which employee would you like to update?`,
            choices: newEmployeeList
        }, 
        {
            type: 'list',
            name: 'newManager',
            message: `Who is their new manager?`,
            choices: newManagerList
        }
    ]).then(({ employee, newManager}) => {
        const { id: employeeId } = newEmployeeList.find(({ name }) => name === employee);

        const { id: newManagerId } = newManagerList.find(({ name }) => name === newManager);

        console.log(employeeId, newManagerId);
        asyncQuery(newManagerId, employeeId);
    })
}

module.exports = { updateManager };