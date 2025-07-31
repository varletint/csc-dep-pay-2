import UserTwo from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

dotenv.config();

export const signUp = async (req, res, next) => {
  const { matricNumber, email, password } = req.body;

  if (
    !matricNumber ||
    !email ||
    !password ||
    email === "" ||
    password === "" ||
    matricNumber === ""
  ) {
    next(errorHandler(400, "All field are required"));
  }

  if (password.length < 6) {
    next(errorHandler(400, "Password must be at least 6 character"));
  }

  try {
    const existingUser = await UserTwo.findOne({ matricNumber });
    if (existingUser) return next(errorHandler(400, "User already exist"));

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new UserTwo({
      matricNumber,
      email,
      password: hashedPassword,
      role: "admin",
    });
    const savedUser = await newUser.save();

    n;
    const token = jwt.sign(
      {
        id: savedUser._id,
        role: savedUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    const { password: pass, ...rest } = savedUser._doc;

    res
      .status(201)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({ ...rest, role: savedUser.role });
  } catch (err) {
    next(err);
  }
};

export const signIn = async (req, res, next) => {
  const { password, matricNumber } = req.body;

  if (!matricNumber || !password || matricNumber === "" || password === "") {
    next(errorHandler(400, "All field are required"));
  }

  try {
    const validUser = await UserTwo.findOne({ matricNumber });
    if (!validUser) return next(errorHandler(400, "Invalid credentials"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(400, "Invalid credentials"));

    const token = jwt.sign(
      {
        id: validUser._id,
        role: validUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({ rest, role: validUser.role });
  } catch (error) {
    next(error);
  }
};
