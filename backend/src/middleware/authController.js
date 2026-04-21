/*
 * Helps parse authentication token and put the userID in the header
 * If auth is expired or not found then redirects to login page
 */
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const createToken = (id) => {
  return jwt.sign({ id }, `${process.env.SECRETKEY}`, {
    expiresIn: "5m",
  });
};

const authenticateToken = async (req) => {
  const user = await User.findById(req.userId);
  if (user) {
    return true;
  }
  return false;
};

const authMiddleware = async (req, res, next) => {
  try {
    if (req.authenticated) {
      return next();
    }
    const authToken = req.cookies.authToken;
    if (!authToken) throw new Error("No token found");
    const decodeId = jwt.verify(authToken, process.env.SECRETKEY);
    req.userId = decodeId.id;

    const isValid = await authenticateToken(req);
    if (isValid) {
      req.authenticated = true;
      return next();
    }
    return res.status(401).json({
      message: "Failed to Verify",
    });
  } catch (error) {
    if (error.message === "No token found") {
      console.log("Session Expired");
      const msg = encodeURIComponent("session-expired");
      return res.status(401).json({
        message: "Failed to Verify",
      });
    }
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const guestMiddleware = async (req, res, next) => {
  try {
    if (req.authenticated) {
      // return res.redirect("/auth/homepage");
      return res.status(200).json({
        messsage: "load homepage",
      });
    }
    const authToken = req.cookies.authToken || req.headers["authToken"];
    if (!authToken) {
      return next();
    }

    const decodeId = jwt.verify(authToken, process.env.SECRETKEY);
    req.userId = decodeId.id;

    const isValid = await authenticateToken(req);
    if (isValid) {
      req.authenticated = true;
      return res.status(200).json({
        message: "load homepage",
      });
    }
    return next();
  } catch (error) {
    // Invalid or expired token — treat as guest instead of 500
    return next();
  }
};

export { authMiddleware, guestMiddleware, createToken };
