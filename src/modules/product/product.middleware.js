import { body, validationResult } from "express-validator";

export const validateProduct = [
    body("name")
        .notEmpty().withMessage("Name is required")
        .isString().withMessage("Name must be a string"),
    body("price")
        .isFloat({ min: 0 }).withMessage("Price must be a positive number"),
    body("stock")
        .isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
    body("category")
        .notEmpty().withMessage("Category is required")
        .isString().withMessage("Category must be a string"),
    body("description")
        .optional()
        .isString().withMessage("Description must be a string"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];