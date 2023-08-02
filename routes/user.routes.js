import { Router } from "express";
import { Register } from "../controllers/users.controller.js";

const router = Router();

router.get("/", (req, res) => res.render("index"));
router.get("/login", (req, res) => res.render("login"));
router.get("/register", (req, res) => res.render("register"));

router.post("/register", Register);
// router.post("/login", (req, res) => {});

export default router;
