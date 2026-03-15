import express from "express";

const app = express(); // Create an express app

app.use(express.json());

// routes import
import userRouter from "./routes/user.route.js";

app.use("/user", userRouter);

export default app;
