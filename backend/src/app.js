import express from "express";
import cookieParser from "cookie-parser";

const app = express(); // Create an express app

app.use(express.json());
app.use(cookieParser());

// routes import
import authRouter from "./routes/auth.route.js";

app.use("/auth", authRouter);

export default app;
