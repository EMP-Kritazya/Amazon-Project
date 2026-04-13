import express from "express";
import cookieParser from "cookie-parser";

// import cors from "cors";  I skipped this as I am applying proxy

const app = express(); // Create an express app

app.use(express.json());
app.use(cookieParser());
// app.use(cors);

// routes import
import authRouter from "./routes/auth.route.js";
import cartRouter from "./routes/cart.route.js";

app.use("/auth", authRouter);
app.use("/cart", cartRouter);

export default app;
