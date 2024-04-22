import express from "express";
import { AuthJWT } from "../middleware/authJWT";
import { isBussinessOwnerOrAdmin } from "../middleware/role.middleware";
import validateSchema from "../middleware/validateSchema.middleware";

import { upload } from "../config/mutler";
import { createDiscountSchema, deleteDiscountSchema, updateDiscountSchema } from "../utils/validation/discount.validation";
import { createDiscount } from "../controller/discount/create.discount.controller";
import { getAllDiscount } from "../controller/discount/get.discount.controller";
import { updateDiscount } from "../controller/discount/update.sponser.controller";
import { deleteDiscount } from "../controller/discount/delete.discount.controller";


const router = express.Router();

router.post("/", AuthJWT, isBussinessOwnerOrAdmin, upload.array('photo', 1), validateSchema(createDiscountSchema), createDiscount)
router.get("/",AuthJWT, isBussinessOwnerOrAdmin, getAllDiscount)
router.patch("/:discount_id", AuthJWT, isBussinessOwnerOrAdmin, upload.array('photo', 1), validateSchema(updateDiscountSchema), updateDiscount)
router.delete("/:discount_id", AuthJWT, isBussinessOwnerOrAdmin, deleteDiscount)

export default router;
