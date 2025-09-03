import express from "express";
import { verifyUserToken } from "../utils/verifyUser.js";

import {
  getItems,
  createItem,
  getUserPurchasedItems,
  getUserPurchasedItemsReceipt,
} from "../controllers/item.controller.js";

const router = express.Router();

router.get("/get-items", verifyUserToken, getItems);
router.get("/purchased-items/:userId", verifyUserToken, getUserPurchasedItems);
router.get("/generate-receipt/:reference", getUserPurchasedItemsReceipt);
router.post("/create-item", verifyUserToken, createItem);

export default router;
