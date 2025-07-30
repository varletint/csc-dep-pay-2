import express from "express";

import {
  getItems,
  createItem,
  getUserPurchasedItems,
} from "../controllers/item.controller.js";

const router = express.Router();

router.get("/get-items", getItems);
router.get("/purchased-items/:userId", getUserPurchasedItems);
router.post("/create-item", createItem);

export default router;
