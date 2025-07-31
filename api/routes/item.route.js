import express from "express";
import { verifyUserToken } from "../utils/verifyUser.js";

import {
  getItems,
  createItem,
  getUserPurchasedItems,
} from "../controllers/item.controller.js";

const router = express.Router();

router.get("/get-items", getItems);
router.get("/purchased-items/:userId", getUserPurchasedItems);
router.post("/create-item", verifyUserToken, createItem);

export default router;
