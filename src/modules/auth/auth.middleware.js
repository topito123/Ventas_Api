import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "t0p1t0p1";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    console.log("Token received: ", token);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        console.log("Token decoded: ", verified);
        req.user = verified;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(403).json({ success: false, error: "Token expired" });
        }
        console.error("Error verifying token", error);
        res.status(403).json({ success: false, error: "Invalid token" });
    }
};

export const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    next();
};