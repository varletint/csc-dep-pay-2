import express from "express";

import { logout, signIn, signUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/logout", logout);

export default router;
