import express from "express";
import { getStudents } from "../controllers/student.controller.js";

const router = express.Router();

router.get("/get-students", getStudents);

export default router;
