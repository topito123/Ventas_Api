import User from "./User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import argon2 from "argon2";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "t0p1t0p1";

export const registerUser = async (data) => {
    const { name, email, password } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("Email already exists");
    }

    const newUser = new User({ name, email, password, role: "CLIENT" }); // Asignar rol CLIENT
    return await newUser.save();
};

export const registerAdminUser = async (data) => {
    const { name, email, password } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("Email already exists");
    }

    const newUser = new User({ name, email, password, role: "ADMIN" }); // Asignar rol ADMIN
    return await newUser.save();
};

export const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isValid = await user.comparePassword(password); // Utiliza el método comparePassword
    if (!isValid) {
        throw new Error("Invalid credentials");
    }

    const token = generateToken(user);
    return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
};

export const generateToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        iat: Math.floor(Date.now() / 1000), // Fecha de emisión
    };

    return jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        throw new Error("Invalid token");
    }
};