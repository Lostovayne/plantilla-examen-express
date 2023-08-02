import express from "express";
import { config } from "dotenv";
import UserRouter from "../routes/user.routes.js";
import cookieParser from "cookie-parser";
import { connectionDB } from "./../database/config.js";

config({ path: "./env/.env" });

const app = express();
const port = process.env.PORT;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(UserRouter);
// app.use(cookieParser());

connectionDB();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;
