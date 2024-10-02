import { Router } from "express";
import { getSegments } from "../controllers/get-segments.js";
import { createEmail } from "../controllers/create-email.js";
import { getEmailTemplates } from "../controllers/get-email-templates.js";
import { createUserInitiatedSend } from "../controllers/create-ui-send.js";

const router = Router();

router.get("/segments", getSegments);
router.post("/create-email", createEmail);
router.get("/email-templates", getEmailTemplates);
router.post("/create-ui-email", createUserInitiatedSend);

export default router;
