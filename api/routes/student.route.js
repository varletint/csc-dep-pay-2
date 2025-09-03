import express from "express";
import { getStudents } from "../controllers/student.controller.js";
import { verifyUserToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/get-students", verifyUserToken, getStudents);

export default router;
