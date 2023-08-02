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
app.use(cookieParser());
app.use(UserRouter);

// app.use(function (req, res, next) {
//     if (!req.user) {
//         res.header("Cache-Control", "no-cache, private, no-store, must-revalidate");
//     }
//     next();
// });

connectionDB();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;