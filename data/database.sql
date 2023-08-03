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

INSERT INTO
    eventos (Nombre, Descripcion, FechaHora, Ubicacion)
VALUES
    (
        'Evento1',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio magni quisquam ut rem aliquid facilis fuga aperiam dolor. Accusantium, provident?',
        '2020-10-10 14:25:00',
        'Playa Palomares'
    ),
    (
        'Evento2',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio magni quisquam ut rem aliquid facilis fuga aperiam dolor. Accusantium, provident?',
        '2023-02-05 18:30:00',
        'Cerro cristo'
    ),
    (
        'Evento3',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio magni quisquam ut rem aliquid facilis fuga aperiam dolor. Accusantium, provident?',
        '2023-02-05 18:30:00',
        'Cerro navia'
    );

INSERT INTO
    registroeventos (UserID, EventoID, ArbolesCantidad)
VALUES
    (1, 1, 10);

INSERT INTO
    registroeventos (UserID, EventoID, ArbolesCantidad)
VALUES
    (1, 2, 20);

SELECT
    e.Nombre AS NombreEvento,
    e.Descripcion AS DescripcionEvento,
    e.FechaHora AS FechaHoraEvento,
    e.Ubicacion AS UbicacionEvento,
    u.Nombre AS NombreUsuario,
    u.Apellido AS ApellidoUsuario,
    u.Correo AS CorreoUsuario,
    r.ArbolesCantidad AS CantidadArboles
FROM
    eventos e
    JOIN registroeventos r ON e.EventoID = r.EventoID
    JOIN usuarios u ON u.UserID = r.UserID;