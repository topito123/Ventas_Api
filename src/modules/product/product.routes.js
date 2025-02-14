import { Router } from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "./product.controller.js";
import { authenticateToken } from "../auth/auth.middleware.js";
import { validateProduct } from "./product.middleware.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", authenticateToken, validateProduct, createProduct);
router.put("/:id", authenticateToken, validateProduct, updateProduct);
router.delete("/:id", authenticateToken, deleteProduct);

export default router;