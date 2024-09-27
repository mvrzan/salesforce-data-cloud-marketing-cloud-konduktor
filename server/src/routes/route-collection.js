import { Router } from "express";
import { getSegment } from "../controllers/get-segment.js";
import { createEmail } from "../controllers/create-email.js";
import { getEmailTemplates } from "../controllers/get-email-templates.js";
import { createUserInitiatedSend } from "../controllers/create-ui-send.js";

const router = Router();

router.get("/segment", getSegment);
router.post("/create-email", createEmail);
router.get("/email-templates", getEmailTemplates);
router.post("/create-ui-email", createUserInitiatedSend);

export default router;
