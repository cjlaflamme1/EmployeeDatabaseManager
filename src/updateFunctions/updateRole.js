const { connection } = require('../config/config');
const inquirer = require('inquirer');
const { asyncRoles, asyncEmployees } = require('../addFunctions/addEmployee');

const asyncQuery = (role, employee) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [role, employee], (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}


const updateRole = async () => {
    const roleList = await asyncRoles();
    const employeeList = await asyncEmployees();
    const updatedRoles = [];

    roleList.forEach((item) => {
        let newItem = {
            id: item.id,
            name: item.title
        };
        updatedRoles.push(newItem);
    });

    const updatedEmployeeList = [];
    employeeList.forEach((item) => {
        let newItem = {
            id: item.id,
            name: `${item.first_name} ${item.last_name}`
        };
        updatedEmployeeList.push(newItem);
    })

    return inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: `Which employee would you like to update?`,
            choices: updatedEmployeeList
        },
        {
            type: 'list',
            name: 'newRole',
            message: `What is their new Role?`,
            choices: updatedRoles
        }
    ]).then(({ employee, newRole }) => {

        const { id: employeeId } = updatedEmployeeList.find(({ name }) => name === employee);

        const { id: roleId } = updatedRoles.find(({ name }) => name === newRole);

        asyncQuery(roleId, employeeId)
    })
}

module.exports = { updateRole }