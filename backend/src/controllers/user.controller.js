import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      console.log("All Fields required");
      return res.status(400).json({
        message: "All Fields are required",
      });
    }

    // Check if there is already an email registered
    const existing = await User.findOne({ email: email.toLowerCase() });

    if (existing)
      return res
        .status(400)
        .json({ message: "User already exists. Please Login" });

    // Create a User
    const user = await User.create({
      username,
      email,
    });

    res.status(201).json({
      message: "User Registered",
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    const statusCode = error.name === "ValidationError" ? 400 : 500;
    res.status(statusCode).json({
      message: error.message || "Internal Sever Error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      console.log("All Fields required");
      return res.status(400).json({
        message: "All Fields are required",
      });
    }

    // find user
    const user = await User.findOne({
      username: username,
      email: email.toLowerCase(),
    });

    if (user)
      return res.status(200).json({
        message: "User found ... Loggin in ....",
      });
    return res.status(400).json({
      message: "Either Username or Email is incorrect",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const reset = async (req, res) => {
  try {
    const { username, email } = req.body;
    if (!username && email) {
      const user = await User.findOne({ email: email.toLowerCase() });
      // Email Username
      return res.status(400).json({
        message: "User found. Username has been emailed to ...",
      });
    }
    if (!email && username) {
      const user = await User.findOne({ username: username });
      // Email: email address
      return res.status(400).json({
        message: "User found. Email Address has been emailed to ...",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export { registerUser, loginUser, reset };
