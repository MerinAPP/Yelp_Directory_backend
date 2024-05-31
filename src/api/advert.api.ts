import express from "express";
import { AuthJWT, CustomerAuthJWT } from "../middleware/authJWT";
import { isSuperOrSystemAdmin, isSystemAdmin } from "../middleware/role.middleware";
import validateSchema from "../middleware/validateSchema.middleware";
import { deleteSponserSchema, getSponserSchema, updateSponserSchema } from "../utils/validation/sponser.validation";
import { deleteSponser } from "../controller/sponser/delete.sponser.controller";

import { upload } from "../config/mutler";
import { createAdvertSchema, deleteAdvertSchema, getAdvertSchema, updateAdvertSchema } from "../utils/validation/advert.validation";
import { createAdvert } from "../controller/advert/create.advert.controller";
import { getAllAdverts } from "../controller/advert/get.advert.controller";
import { updateAdvert } from "../controller/advert/update.advert.controller";
import { deleteAdvert } from "../controller/advert/delete.advert.controller";
import { getUserAdverts } from "../controller/advert/getUser.advert.controller";

const router = express.Router();

router.post("/", AuthJWT, isSuperOrSystemAdmin,
    upload.single('coverImage'),
    validateSchema(createAdvertSchema),
    createAdvert)
router.get("/user", CustomerAuthJWT, validateSchema(getAdvertSchema), getUserAdverts)
router.get("/", validateSchema(getAdvertSchema), getAllAdverts)

router.patch("/:advert_id", AuthJWT, isSuperOrSystemAdmin,
    upload.single('coverImage'),
    validateSchema(updateAdvertSchema), updateAdvert)
router.delete("/:advert_id", AuthJWT, isSuperOrSystemAdmin, validateSchema(deleteAdvertSchema), deleteAdvert)



export default router;
