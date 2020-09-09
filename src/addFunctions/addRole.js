const { connection } = require('../config/config');
const inquirer = require('inquirer');
const { promisify } = require('util');
const query = promisify(connection.query).bind(connection);

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
}

addNewRole();