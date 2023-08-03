import express from "express";
import { config } from "dotenv";
import UserRouter from "../routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectionDB } from "./../database/config.js";

config({ path: "./env/.env" });

const app = express();
const port = process.env.PORT;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(function (req, res, next) {
    if (!req.user) {
        res.header(
            "Cache-Control",
            "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
        );
    }
    next();
});
app.use(cors());

app.use(UserRouter);

connectionDB();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;
