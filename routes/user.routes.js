import { Router } from "express";
import { Login, Register, isAuthenticated, logout } from "../controllers/users.controller.js";

const router = Router();

router.get("/", (req, res) => {
    res.redirect("/api/users/login");
});

router.get("/api/users/", isAuthenticated, (req, res) => {
    console.log(req.user);
    res.render("index", {
        user: req.user,
    });
});

router.get("/api/users/login", (req, res) => res.render("login"));
router.get("/api/users/register", (req, res) => res.render("register"));
// Cerrar sesion
router.get("/api/users/logout", logout);
router.post("/api/users/register", Register);
router.post("/api/users/login", Login);

export default router;
