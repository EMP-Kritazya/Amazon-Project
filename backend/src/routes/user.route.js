import { Router } from "express";
import {
  loginUser,
  registerUser,
  reset,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/reset").post(reset);

export default router;
