const question = [
    {
        type: "list",
        name: "questionList",
        message: "What would you like to do?",
        choices: [
            "Add departments",
            "Add roles",
            "Add employees",
            "View departments",
            "View roles",
            "View Employees",
            "Update Employee Role", 
            "Exit"
        ]
    }
]

module.exports = {question};