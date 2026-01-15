import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser} from "../../modules/users/users.controller.js";
import { User } from "../../modules/users/users.model.js";
import { authUser } from "../../middlewares/auth.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const router = Router()


router.get("/", getUsers);

router.get("/auth/cookie/me", authUser, async (req, res, next) => {
  try {
    const userId = req.user.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({
        error: true,
        message: "Unauthenticated",
      });
    }

    res.status(200).json({
      error: false,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", getUser);

router.post("/register", createUser);

// The function inside is called Route Handler / Controller
router.delete("/:id", deleteUser);

router.patch("/:id", authUser, updateUser);

//login
router.post("/auth/cookie/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: "Email and Password are required..",
    });
  }

  try {
    const normalizedEmail = String(email).trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail }).select("+password");

    if (!user) {
      return res.status(401).json({
        error: true,
        message: "User not found...",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(401).json({
        error: true,
        message: "Invalid password...",
      });
    }

    // Generate JSON web Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("accessToken", token, {
      // setting for use the cookie
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.status(200).json({
      error: false,
      message: "Login successfull",
      token: token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
});