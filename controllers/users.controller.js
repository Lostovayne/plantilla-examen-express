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
        const { email, password } = req.body;
        const PasswordHash = bcrypt.hashSync(password);
        const infoUser = { email, password: PasswordHash };
        const [result] = await pool.execute("SELECT * FROM users WHERE email = ?", [infoUser.email]);

        if (result.length > 0) {
            res.status(400).json({
                status: "error",
                msg: "El usuario ya existe",
            });
        } else {
            const [rows] = await pool.execute("INSERT INTO users (email, password) VALUES (?, ?)", [
                infoUser.email,
                infoUser.password,
            ]);

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
        const [result] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);

        if (result.length === 0) {
            res.status(400).json({
                status: "error",
                msg: "El usuario no existe",
            });
        } else {
            const user = result[0];

            if (bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
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
                        id: user.id,
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
            const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [decodificada.id]);
            req.user = rows[0];
            next();
        } catch (error) {
            console.log(error);
            next();
        }
    } else {
        res.redirect("/login");
    }
};

export const logout = (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/");
};
