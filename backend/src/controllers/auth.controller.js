import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, `${process.env.SECRETKEY}`, {
    expiresIn: "15m",
  });
};

const authMiddelware = (req, res, next) => {
  try {
    const authToken = req.cookies.authToken || req.headers["authToken"];
    if (!authToken) throw new Error("No token found");
    console.log("Auth Token: ", authToken);
    const decodeId = jwt.verify(authToken, process.env.SECRETKEY);
    req.userId = decodeId.id;
    // at this point, I'll have verified token expired in cookie and in jwt body as well
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token Expired",
        error,
      });
    }
    return res.status(404).json({
      message: "Couldn't get token",
      error,
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
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
      password,
    });

    const token = createToken(user._id);
    res.cookie("authToken", token, { httpOnly: true, maxAge: maxAge * 1000 });

    user.authenticated = true;
    user.loggedIn = true;

    res.status(201).json({
      message: "User Registered",
      user: user._id,
    });
  } catch (error) {
    const statusCode = error.name === "ValidationError" ? 400 : 500;
    res.status(statusCode).json({
      message: error.message || "Internal Sever Error",
    });
  }
};

const loginUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      console.log("All Fields required");
      return res.status(400).json({
        message: "All Fields are required",
      });
    }

    // find user
    const user = await User.findOne({
      username,
      email: email.toLowerCase(),
      password,
    });

    if (user) {
      user.authenticated = true;
      user.loggedIn = true;
      return res.status(200).json({
        message: "User found ... Loggin in ....",
      });
    }
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

const loginPage = async (req, res, next) => {
  try {
    console.log("You are in Login Page\n");
    console.log("USER found: ", req.userId);
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found, Create an account first",
      });
    }
    return res.status(400).json({
      message: "LOGGED IN",
      id: user._id,
      username: user.username,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export { registerUser, loginUser, reset, loginPage, authMiddelware };
