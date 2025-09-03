import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import itemRoutes from "./routes/item.route.js";
import authRoutes from "./routes/auth.route.js";
import webhooRoute from "./routes/webhook.route.js";
import studentsRoute from "./routes/student.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname2 = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: "https://cospayments.onrender.com",
  })
);
app.use(express.json());
app.use(cookieParser());

dotenv.config();

mongoose
  .connect(process.env.MONGO_KEYS)
  .then(() => {
    console.log("mongoDB database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("server running at 3000");
});

app.use("/api/item", itemRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/webhook", webhooRoute);
app.use("/api/students", studentsRoute);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname2, "views"));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
