import { Router } from "express";
import { getSegment } from "../controllers/get-segment.js";
import { createEmail } from "../controllers/create-email.js";
import { createUserInitiatedSend } from "../controllers/create-ui-send.js";

const router = Router();

router.get("/segment", getSegment);
router.post("/create-email", createEmail);
router.post("/create-ui-email", createUserInitiatedSend);

export default router;
