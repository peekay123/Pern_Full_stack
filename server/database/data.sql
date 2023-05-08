CREATE DATABASE mini_project;

CREATE TABLE admin(
    user_id uuid PRIMARY KEY DEFAULT 
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT 
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
    );

 CREATE TABLE data(
     id BIGSERIAL PRIMARY KEY NOT NULL,
    category VARCHAR(255) NOT NULL,
    image BYTEA,
    breed VARCHAR(255) NOT NULL,
    age VARCHAR(255) NOT NULL,
    vaccinated VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    price VARCHAR(255),     
    name VARCHAR(255) NOT NULL,
    number VARCHAR(255) NOT NULL
    );
    