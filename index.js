import express from "express";
import connectDB from "./configs/db.js";
import dotenv from "dotenv";
import authRoutes from "./src/modules/auth/auth.routes.js";
import { initializeAdminUser } from "./src/modules/auth/auth.service.js"; 

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);

initializeAdminUser();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});