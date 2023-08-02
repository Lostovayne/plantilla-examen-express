import { createPool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: "./env/.env" });

const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

export const connectionDB = async () => {
    try {
        const connection = await pool.getConnection();
        connection.release();
        console.log("Database connected");
    } catch (error) {
        console.log("Failed to connect to database");
    }
};

export default pool;
