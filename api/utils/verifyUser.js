import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler.js";

export const verifyUserToken = (req, res, next) => {
  const token = req.cookies?.access_token;

  if (!token) {
    // return next(errorHandler(401, "Valid token not found"));
    return res.status(401).render("errorPage", {
      title: "Unauthorized",
      message: "Valid token not found. Please log in to continue.",
      redirectUrl: "/login",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // if (err) return next(errorHandler(401, "Unauthorized"));
    // if (err) {
    //   if (req.originalUrl.startsWith("/api")) {
    //     return next(errorHandler(401, "Unauthorized"));
    //   }
    //   return res.redirect("/login");
    // }
    return res.status(401).render("errorPage", {
      title: "Unauthorized",
      message: "Your session has expired or the token is invalid.",
      redirectUrl: "/login",
    });
    req.user = user;
    next();
  });
};
