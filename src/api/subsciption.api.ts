import express from "express";
import { AuthJWT } from "../middleware/authJWT";

import validateSchema from "../middleware/validateSchema.middleware";
import { createSubscriptionSchema } from "../utils/validation/subscription.validation";

import { createSubsciption } from "../controller/subscribe/create.subscription";
import { webhook } from "../controller/subscribe/webhook.subscribe.controller";
const router = express.Router();

router.post("/", AuthJWT, validateSchema(createSubscriptionSchema), createSubsciption)
router.post("/webhook", webhook)





export default router;
