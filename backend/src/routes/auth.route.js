import { Router } from "express";
import {
  deleteProfile,
  homePage,
  loginPage,
  loginUser,
  signup,
  signupPage,
} from "../controllers/user.controller.js";
import {
  authMiddleware,
  guestMiddleware,
} from "../middleware/authController.js";

const router = Router();

router.get("/homepage", authMiddleware, homePage);

router.post("/login", loginUser);

router.get(["/", "/login"], guestMiddleware, loginPage);

router.post("/signup", signup);
router.get("/signup", signupPage);

router.get("/delete", authMiddleware, deleteProfile);

export default router;
