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
    }
]

module.exports = {question};