CREATE DATABASE valle_verde;

use valle_verde;

CREATE TABLE
    Usuarios (
        UserID INT PRIMARY KEY AUTO_INCREMENT,
        Nombre VARCHAR(50),
        Apellido VARCHAR(50),
        RUT VARCHAR(20),
        Correo VARCHAR(50),
        Contrasena VARCHAR(255),
        FechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FechaActualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    Eventos (
        EventoID INT PRIMARY KEY AUTO_INCREMENT,
        Nombre VARCHAR(45),
        Descripcion VARCHAR(100),
        FechaHora DATETIME,
        Ubicacion VARCHAR(50)
    );

CREATE TABLE
    RegistroEventos (
        RegistroID INT PRIMARY KEY AUTO_INCREMENT,
        UserID INT,
        EventoID INT,
        ArbolesCantidad INT,
        FechaRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (UserID) REFERENCES Usuarios (UserID),
        FOREIGN KEY (EventoID) REFERENCES Eventos (EventoID)
    );

CREATE TABLE
    Donaciones (
        DonacionID INT PRIMARY KEY,
        UserID INT,
        Monto INT,
        FechaDonacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (UserID) REFERENCES Usuarios (UserID)
    );

CREATE TABLE
    GaleriaImagenes (
        ImagenID INT PRIMARY KEY AUTO_INCREMENT,
        EventoID INT,
        URL_Imagen VARCHAR(255),
        FechaSubida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        Descripcion VARCHAR(255),
        FOREIGN KEY (EventoID) REFERENCES Eventos (EventoID)
    );