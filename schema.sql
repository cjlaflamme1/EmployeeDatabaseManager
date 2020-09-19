DROP DATABASE IF EXISTS employee_management;

CREATE DATABASE employee_management;
USE employee_management;

CREATE TABLE department
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(30) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE role
(
	id int NOT NULL AUTO_INCREMENT,
	title varchar(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee
(
	id int NOT NULL AUTO_INCREMENT,
	first_name varchar(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT Null,
    manager_id INT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);