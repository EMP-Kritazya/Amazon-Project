import { Router } from "express";
import { authMiddleware } from "../middleware/authController.js";
import { cartQuantity, getCartItems } from "../controllers/cart.controller.js";
import { addToCart } from "../controllers/cart.controller.js";

const router = Router();

router.get("/getCartItems", authMiddleware, getCartItems);

router.post("/addToCart", authMiddleware, addToCart);

router.get("/getCartQuantity", authMiddleware, cartQuantity);
export default router;
