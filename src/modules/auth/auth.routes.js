import express from "express";
import { register, login, createAdminUser } from "./auth.controller.js";
import { authenticateToken, authorizeAdmin } from "./auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/admin/register", authenticateToken, authorizeAdmin, createAdminUser); // Nueva ruta para crear usuarios ADMIN
router.get("/profile", authenticateToken, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});

export default router;