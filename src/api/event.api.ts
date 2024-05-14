import express from "express";
import { AuthJWT } from "../middleware/authJWT";
import { isBussinessOwnerOrAdmin } from "../middleware/role.middleware";
import validateSchema from "../middleware/validateSchema.middleware";

import { upload } from "../config/mutler";
import { createEventSchema, deleteEventSchema, updateEventSchema } from "../utils/validation/event.validation";
import { createEvent, createEventWithMultipleFiles } from "../controller/event/create.event.controller";
import { getAllEvent } from "../controller/event/get.event.controller";
import { updateEvent } from "../controller/event/update.event.controller";
import { deleteEvent } from "../controller/event/delete.event.controller";
import { getWeekEvent } from "../controller/event/test";

const router = express.Router();





router.post("/",
    AuthJWT,
    isBussinessOwnerOrAdmin,
    upload.single('photo'),
    validateSchema(createEventSchema),
    createEvent)

// router.post("/multi", AuthJWT, isBussinessOwnerOrAdmin, upload.array('photos', 10), validateSchema(createEventSchema), createEventWithMultipleFiles)
router.get("/", AuthJWT, isBussinessOwnerOrAdmin, getAllEvent)

router.patch("/:event_id",
    AuthJWT,
    isBussinessOwnerOrAdmin,
    upload.single('photo'),
    validateSchema(updateEventSchema),
    updateEvent)

router.delete("/:event_id", AuthJWT, isBussinessOwnerOrAdmin, validateSchema(deleteEventSchema), deleteEvent)

export default router;
