import { Router } from "express";
import { Login, Register, isAuthenticated, logout } from "../controllers/users.controller.js";

const router = Router();

router.get("/", isAuthenticated, (req, res) => {
    res.render("index", {
        user: req.user,
    });
});
router.get("/login", (req, res) => res.render("login"));
router.get("/register", (req, res) => res.render("register"));
// Cerrar sesion
router.get("/logout", logout);

router.post("/register", Register);
router.post("/login", Login);

export default router;