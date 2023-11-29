-- mysql -u root -p 
CREATE DATABASE IF NOT EXISTS refrigeraciones;

USE refrigeraciones;

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(60) NOT NULL,
    password VARCHAR(100) NOT NULL,
    name VARCHAR(40) NOT NULL,
    lastname VARCHAR(40) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    emergencyphone VARCHAR(20) NOT NULL,
    birthday DATE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    lastname VARCHAR(40) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    emergencyphone VARCHAR(20) NOT NULL,
    birthday DATE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE tools(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    description VARCHAR(100) NOT NULL,
    bearer VARCHAR(20) NOT NULL,
    dateOfAperture DATE NOT NULL,
    returnDate DATE NOT NULL,
    employee VARCHAR(20) NOT NULL,
    service VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE services(
    id INT NOT NULL AUTO_INCREMENT,
    service VARCHAR(40) NOT NULL,
    description VARCHAR(100) NOT NULL,
    client VARCHAR(20) NOT NULL,
    dateOfAssistance DATE NOT NULL,
    budget VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

