const { connection } = require('./config/config');


const viewAllQuery = (table) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM ??', [table], (err, result) => {
            if (err) reject(err);
            console.table(result);
            resolve(result);
        });



    })
}

const addQuery = (table, answerObject) => {
    return new Promise((resolve, reject) => {
        switch (table) {
            case 'Add departments':
                connection.query('INSERT INTO department SET ?', [{ name: answerObject.departmentName }], (err, res) => {
                    if (err) reject(err);
                    console.log(`Inserting new department...`);
                    resolve();
                })
                break;
            }
    })
}

module.exports = { viewAllQuery, addQuery };