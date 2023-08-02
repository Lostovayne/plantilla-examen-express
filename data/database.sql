CREATE DATABASE plantilla;

use plantilla;

CREATE TABLE
    users (
        id INT NOT NULL AUTO_INCREMENT,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(250) NOT NULL,
        PRIMARY KEY (id)
    )