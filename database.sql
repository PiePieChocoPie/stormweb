

CREATE TABLE person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    roleID INTEGER,
    FOREIGN KEY (roleID) REFERENCES roles (id)
);
CREATE TABLE roles(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);