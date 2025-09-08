import express from "express";
import {
  getTransactions,
  getQuerySearch,
  updateWebhook,
  webHook,
} from "../controllers/webhook.controller.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";
import { verifyUserToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/paystack", webHook);
router.put("/update-paystack/:referecnce", updateWebhook);
router.get("/all_transactions", verifyAdmin, getTransactions);
router.get("/transactions_", getQuerySearch);

export default router;
