import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

const startServer = async () => {
  try {
    await connectDB();

    app.on("error", (error) => {
      console.log("Error", error);
      throw error;
    });

    app.listen(process.env.PORT || 4000, () => {
      console.log(
        `Server running on port: http://localhost:${process.env.PORT}`,
      );
    });
  } catch (error) {
    console.log("Failure starting the server", error);
  }
};

startServer();
