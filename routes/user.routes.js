import { Router } from "express";
import {
    AllEvents,
    Login,
    Register,
    UpdateUser,
    isAuthenticated,
    logout,
    AddEvent,
} from "../controllers/users.controller.js";

const router = Router();

router.get("/", (req, res) => {
    res.redirect("/api/users/login");
});

router.get("/api/users/", isAuthenticated, (req, res) => {
    res.render("index", {
        user: req.user,
    });
});

router.get("/api/users/perfil", isAuthenticated, (req, res) => {
    const userData = {
        id: req.user.UserID,
        nombre: req.user.Nombre,
        apellido: req.user.Apellido,
        correo: req.user.Correo,
    };
    console.log(userData);
    res.render("perfil", {
        userData,
    });
});

router.get("/api/users/login", (req, res) => res.render("login"));
router.get("/api/users/register", (req, res) => res.render("register"));
router.get("/api/events", isAuthenticated, (req, res) => {
    res.render("Galeria");
});
router.get("/api/events/all", isAuthenticated, AllEvents);
router.post("/api/events/all", isAuthenticated, AddEvent);

// Cerrar sesion
router.get("/api/users/logout", logout);
router.post("/api/users/register", Register);
router.post("/api/users/login", Login);
router.put("/api/users/:userid", isAuthenticated, UpdateUser);

export default router;
