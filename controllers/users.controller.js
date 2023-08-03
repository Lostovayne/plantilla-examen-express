import pool from "../database/config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
    path: "./env/.env",
});

export const Register = async (req, res) => {
    console.log(req.body);
    try {
        const { name, lastName, rut, email, password } = req.body;
        const PasswordHash = bcrypt.hashSync(password);
        const infoUser = { name, lastName, rut, email, password: PasswordHash };
        const [result] = await pool.execute("SELECT * FROM usuarios WHERE correo = ?", [infoUser.email]);

        if (result.length > 0) {
            res.status(400).json({
                status: "error",
                msg: "El usuario ya existe",
            });
        } else {
            const [rows] = await pool.execute(
                "INSERT INTO usuarios (nombre,apellido, rut,correo, contrasena) VALUES (?, ?,?,?,?)",
                [infoUser.name, infoUser.lastName, infoUser.rut, infoUser.email, infoUser.password]
            );

            res.status(201).json({
                status: "success",
                msg: "Usuario creado",
                id: rows.insertId,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            msg: "Error al crear el usuario",
            error,
        });
    }
};

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [result] = await pool.execute("SELECT * FROM usuarios WHERE Correo = ?", [email]);

        console.log(result);

        if (result.length === 0) {
            res.status(400).json({
                status: "error",
                msg: "El usuario no existe",
            });
        } else {
            const user = result[0];

            if (bcrypt.compareSync(password, user.Contrasena)) {
                const token = jwt.sign({ id: user.UserID }, process.env.SECRET_KEY, {
                    expiresIn: "1h",
                });

                res.cookie("jwt", token, {
                    maxAge: 3600000,
                    httpOnly: true,
                })
                    .status(200)
                    .json({
                        status: "success",
                        msg: "Usuario autenticado",
                        id: user.UserID,
                    });
            } else {
                res.status(400).json({
                    status: "error",
                    msg: "Contraseña incorrecta",
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            msg: "Error al autenticar el usuario",
            error,
        });
    }
};

export const isAuthenticated = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decodificada = jwt.verify(req.cookies.jwt, process.env.SECRET_KEY);
            const [rows] = await pool.execute("SELECT * FROM usuarios WHERE UserID  = ?", [decodificada.id]);
            req.user = rows[0];
            next();
        } catch (error) {
            console.log(error);
            next();
        }
    } else {
        res.redirect("/api/users/login");
    }
};

export const logout = (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/api/users/");
};

export const UpdateUser = async (req, res) => {
    console.log("Mostrando los datos");

    try {
        const id = req.params.userid;
        const { nombre, apellido, correo } = req.body;
        const [result] = await pool.execute(
            "UPDATE usuarios SET nombre = ?, apellido = ?, correo = ? WHERE UserID = ?",
            [nombre, apellido, correo, id]
        );

        res.status(200).json({
            status: "success",
            msg: "Usuario actualizado",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            msg: "Error al actualizar el usuario",
            error,
        });
    }
};

export const AllEvents = async (req, res) => {
    try {
        const sql = `
            SELECT e.Nombre AS NombreEvento, e.Descripcion AS DescripcionEvento, e.FechaHora AS FechaHoraEvento, e.Ubicacion AS UbicacionEvento, u.Nombre AS NombreUsuario, u.Apellido AS ApellidoUsuario, u.Correo AS CorreoUsuario, r.ArbolesCantidad AS CantidadArboles
            FROM eventos e
            JOIN registroeventos r ON e.EventoID = r.EventoID
            JOIN usuarios u ON u.UserID = r.UserID;
        `;

        const [results] = await pool.execute(sql);
        const sqlform = `SELECT * FROM eventos
        WHERE FechaHora > NOW();`;

        const [resultsform] = await pool.execute(sqlform);
        console.log(resultsform);

        res.render("eventos", {
            events: results,
            eventsform: resultsform,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            msg: "Error retrieving events",
            error,
        });
    }
};

export const AddEvent = async (req, res) => {
    try {
        const UserEvent = {
            id: req.user.UserID,
            idEvent: Number(req.body.evento),
            ArbolesCantidad: Number(req.body.cantidadArboles),
        };

        const registerUserEvent = await pool.execute(
            "INSERT INTO registroeventos (UserID, EventoID, ArbolesCantidad) VALUES (?, ?, ?)",
            [UserEvent.id, UserEvent.idEvent, UserEvent.ArbolesCantidad]
        );

        console.log(registerUserEvent);

        res.status(200).json({
            status: "success",
            msg: "Registrado en el evento",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            msg: "Error al registrar el evento",
            error,
        });
    }
};
