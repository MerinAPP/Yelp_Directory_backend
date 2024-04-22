import express from "express";
import { AuthJWT, CustomerAuthJWT } from "../middleware/authJWT";
import validateSchema from "../middleware/validateSchema.middleware";

import { getAllNotification } from "../controller/notification/get.notification";
import { updateNotificationSchema } from "../utils/validation/notification.validation";
import { markNotficationAsRead } from "../controller/notification/markSingleAsRead.notification";
import { markNotficationsAsRead } from "../controller/notification/markAllAsRead.notification";
import '../controller/notification/delete.notification'

const router = express.Router();

router.get("/", CustomerAuthJWT, getAllNotification)
router.patch("/:notification_id", CustomerAuthJWT, validateSchema(updateNotificationSchema), markNotficationAsRead)
router.patch("/", CustomerAuthJWT, markNotficationsAsRead)




export default router;
