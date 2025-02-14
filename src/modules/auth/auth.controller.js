import { registerUser, loginUser, registerAdminUser } from "./auth.service.js";

export const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email, password);
        res.json({ message: "Login successful", data: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const createAdminUser = async (req, res) => {
    try {
        const user = await registerAdminUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};