import pool from "../database/config.js";
import bcrypt from "bcryptjs";

export const Register = async (req, res) => {
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
