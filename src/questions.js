const inquirer = require("inquirer");
const { connection } = require('./config/config');

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
    }, 
    // Maybe remove this question to turn into a function? 
    {
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
    // Move the following functions into a new source file, too messy for the question array.
    // {
    //     type: 'input',
    //     name: 'roleName',
    //     message: 'What is the name of the new role?',
    //     validate: function (answer) {
    //         if(RegExp(/([A-Za-z0-9])\w+/g).test(answer)) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     },
    //     when: (response) => response.questionList === 'Add roles'
    // },
    // {
    //     type: 'input',
    //     name: 'roleSalary',
    //     message: 'What is the salary of the new role?',
    //     validate: function (answer) {
    //         if(RegExp(/([0-9])\w+/g).test(answer)) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     },
    //     when: (response) => response.questionList === 'Add roles'
    // },
    // {
    //     type: 'list',
    //     name: 'roleDepartment',
    //     message: 'What is the department of the new role?',
    //     choices: async () => {
    //         let departments = [];
    //        departments = await getDepartment();
    //        const newList = [];
    //        departments.foreach((department) => {
    //            newList.push({
    //                name: department.name,
    //                id: department.id
    //            });
    //        })
    //         return newList;
    //     },
    //     when: (response) => response.questionList === 'Add roles'
    // }
]

module.exports = {question};