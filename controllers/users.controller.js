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
