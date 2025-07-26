import express from "express";
import { updateWebhook, webHook } from "../controllers/webhook.controller.js";
const router = express.Router();

router.post("/paystack", webHook);
router.put("/update-paystack/:referecnce", updateWebhook);

export default router;
