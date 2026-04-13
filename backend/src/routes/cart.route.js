import { Router } from "express";
import { authMiddleware } from "../middleware/authController.js";
import { getCartItems } from "../controllers/cart.controller.js";
import { addToCart } from "../controllers/cart.controller.js";

const router = Router();

router.get("/getItems", authMiddleware, getCartItems);

router.post("/addToCart", authMiddleware, addToCart);

export default router;
