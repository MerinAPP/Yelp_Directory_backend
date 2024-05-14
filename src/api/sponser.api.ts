import express from "express";
import { AuthJWT } from "../middleware/authJWT";
import { isSuperOrSystemAdmin } from "../middleware/role.middleware";
import validateSchema from "../middleware/validateSchema.middleware";
import { createSponserSchema, deleteSponserSchema, getSponserSchema, updateSponserSchema } from "../utils/validation/sponser.validation";
import { getAllSponsers } from "../controller/sponser/get.sponser.controller";
import { deleteSponser } from "../controller/sponser/delete.sponser.controller";
import { updateSponser } from "../controller/sponser/update.sponser.controller";
import { createSponser } from "../controller/sponser/create.sponser.controller";
import { upload } from "../config/mutler";

const router = express.Router();

router.post("/", AuthJWT, isSuperOrSystemAdmin,
    upload.single('coverImage'),
    validateSchema(createSponserSchema), createSponser)
router.get("/", validateSchema(getSponserSchema), getAllSponsers)
router.patch("/:sponser_id",
    AuthJWT,
    isSuperOrSystemAdmin,
    upload.single('coverImage'),
    validateSchema(updateSponserSchema),
    updateSponser)
router.delete("/:sponser_id", AuthJWT, isSuperOrSystemAdmin, validateSchema(deleteSponserSchema), deleteSponser)



export default router;
