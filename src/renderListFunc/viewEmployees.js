const { connection } = require('../config/config');


const viewEmployees = async () => {


    return new Promise ((resolve, reject) => {
        connection.query('SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id', (err, data) => {
            if(err) reject(err);
            const newEmployeeList = [];
            data.forEach((item) => {
                let newItem = {
                    id: item.id, 
                    first: item.first_name, 
                    last: item.last_name, 
                    title: item.title
                };
                newEmployeeList.push(newItem);
            })
            console.table(newEmployeeList);
            resolve(newEmployeeList);
        })
    })
} 

module.exports = { viewEmployees };