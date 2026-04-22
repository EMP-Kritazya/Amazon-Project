import { createToken } from "../middleware/authController.js";
import { User } from "../models/user.model.js";

const addCookie = (res, user) => {
  const token = createToken(user._id);
  res.cookie("authToken", token, { httpOnly: true, maxAge: 5 * 60 * 1000 });
};

const deleteCookie = (res) => {
  res.clearCookie("authToken");
};

const signup = async (req, res) => {
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

    const msg = "User Registered";
    return res.status(201).json({
      message: msg,
    });
  } catch (error) {
    const statusCode = error.name === "ValidationError" ? 400 : 500;
    return res.status(statusCode).json({
      message: error.message || "Internal Sever Error",
    });
  }
};

// When someone logs in.....
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      console.log("All Fields required");
      return res.status(400).json({
        message: "All Fields are required",
      });
    }

    // find user
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    // Compare passwords
    const isMatched = await user.comparePassword(password);
    if (!isMatched)
      return res.status(401).json({
        message: "Invalid Credentials",
      });

    addCookie(res, user);
    return res.status(200).json({
      message: "Login Successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// need to load login page
const loginPage = async (req, res, next) => {
  res.status(200).json({
    message: "load loginpage",
  });
};

const signupPage = async (req, res, next) => {
  res.status(200).json({
    message: "load signuppage",
  });
};

const deleteProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const message = encodeURIComponent("userNotFound-directing-to-login");
      return res.redirect(`/auth/login/?msg=${message}`);
    }
    await user.deleteOne();

    deleteCookie(res);
    req.authenticated = false;

    const message = encodeURIComponent("user_deleted-redirect-to-login");
    res.redirect(`/auth/login/?msg=${message}`);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const homePage = async (req, res, next) => {
  return res.status(200).json({
    message: "load home page",
  });
};

export { signup, signupPage, loginUser, loginPage, deleteProfile, homePage };
