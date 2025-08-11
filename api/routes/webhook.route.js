import express from "express";
import {
  getTransactions,
  updateWebhook,
  webHook,
} from "../controllers/webhook.controller.js";
const router = express.Router();

router.post("/paystack", webHook);
router.put("/update-paystack/:referecnce", updateWebhook);
router.get("/all_transactions", getTransactions);

export default router;
