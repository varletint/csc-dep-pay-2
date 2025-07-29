import express from "express";

import { getItems, createItem } from "../controllers/item.controller.js";

const router = express.Router();

router.get("/get-items", getItems);
router.post("/create-item", createItem);

export default router;
