import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express(); // Create an express app

// Allow browser clients on any localhost port (Live Server, Vite, etc.) to call the API with cookies.
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// routes import
import authRouter from "./routes/auth.route.js";
import cartRouter from "./routes/cart.route.js";

app.use("/auth", authRouter);
app.use("/cart", cartRouter);

export default app;
