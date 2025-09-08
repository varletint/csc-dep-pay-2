// middlewares/verifyAdmin.js
import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler.js";

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, "Access denied. No token provided."));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      // return res.status(403).render("errorPage", {
      //   title: "Unauthorized",
      //   message: "Your session has expired or the token is invalid.",
      //   redirectUrl: "/login",
      // });
      return next(
        errorHandler(403, "Your session has expired or the token is invalid.")
      );

    if (user.role !== "admin") {
      return next(errorHandler(403, "Admins only."));

      // return res.status(403).render("errorPage", {
      //   title: "Unauthorized",
      //   message: "Access denied. Admins only.",
      //   redirectUrl: "/login",
      // });
    }

    req.user = user; // store user info for later use
    next();
  });
};
