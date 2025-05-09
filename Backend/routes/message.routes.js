import express from "express";
import { getMessages, sendMessage, markMessageAsRead } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.put("/read/:messageId", protectRoute, markMessageAsRead);

export default router;