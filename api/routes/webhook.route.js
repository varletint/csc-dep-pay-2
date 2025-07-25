import express from "express";
import { webHook } from "../controllers/webhook.controller.js";
const router = express.Router();

router.post("/paystack", webHook);

export default router;
