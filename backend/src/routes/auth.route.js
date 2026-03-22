import { Router } from "express";
import {
  authMiddelware,
  loginPage,
  loginUser,
  registerUser,
  reset,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", loginUser);
router.get("/login", authMiddelware, loginPage);

router.post("/signup", registerUser);
// router.get("/signup", registerPage);

router.post("/reset", reset);
// router.get("/reset", resetPage);

export default router;
