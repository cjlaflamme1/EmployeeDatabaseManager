const inquirer = require("inquirer");

const question = [
    {
        type: "list",
        name: "questionList",
        message: "What would you like to do?",
        choices: [
            "Add departments",
            "Add roles",
            "Add employees",
            new inquirer.Separator(),
            "View departments",
            "View roles",
            "View Employees",
            new inquirer.Separator(),
            "Update Employee Role",
            new inquirer.Separator(), 
            "Exit",
            new inquirer.Separator()
        ]
    }, {
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the new department?',
        validate: function (answer) {
            if(RegExp(/([A-Za-z0-9])\w+/g).test(answer)) {
                return true;
            } else {
                return false;
            }
        },
        when: (response) => response.questionList === 'Add departments'
    } 
]

module.exports = {question};