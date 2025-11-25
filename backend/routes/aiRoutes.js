import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { aiSuggestions } from "../controllers/aiController.js";
const router=express.Router();
router.post("/suggestions", authMiddleware, aiSuggestions);
export default router;
