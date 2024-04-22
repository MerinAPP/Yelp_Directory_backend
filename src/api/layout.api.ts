import express from "express";
import { AuthJWT, CustomerAuthJWT } from "../middleware/authJWT";
import { getLayout } from "../controller/layout/get.layout.controller";
import validateSchema from "../middleware/validateSchema.middleware";
import { createHero } from "../controller/layout/hero/create.hero.layout.controller";
import { updateHero } from "../controller/layout/hero/edit.hero.layout.controller";
import { deleteHero } from "../controller/layout/hero/delete.hero.layout.controller";
import { isSuperOrSystemAdmin } from "../middleware/role.middleware";
import { createBenefitSchema, createFeatureSchema, deleteAboutSchema, deleteFeatureSchema, updateAboutSchema, updateFeatureSchema } from "../utils/validation/layout.validation";
import { createBenefit } from "../controller/layout/benefits/create.benefit.layout.controller";
import { updateBenefit } from "../controller/layout/benefits/edit.benefit.layout.controller";
import { deleteBenefit } from "../controller/layout/benefits/delete.benefit.layout.controller";
import { createAbout } from "../controller/layout/about/create.about.layout.controller";
import { updateAbout } from "../controller/layout/about/edit.about.layout.controller";
import { deleteAbout } from "../controller/layout/about/delete.about.layout.controller";
import { createFeature } from "../controller/layout/feature/create.featurelayout.controller";
import { updateFeature } from "../controller/layout/feature/edit.feature.layout.controller";
import { deleteFeature } from "../controller/layout/feature/delete.feature.layout.controller";
import { upload } from "../config/mutler";


const router = express.Router();


router.get("/", getLayout)

// hero
router.post("/hero", AuthJWT, isSuperOrSystemAdmin, upload.array('image', 1), createHero)
router.patch("/hero", AuthJWT, isSuperOrSystemAdmin, upload.array('image', 1), updateHero)
router.delete("/hero", AuthJWT, isSuperOrSystemAdmin, deleteHero)

// benefit
router.post("/benefit", AuthJWT, isSuperOrSystemAdmin, validateSchema(createBenefitSchema), createBenefit)
router.patch("/benefit", AuthJWT, isSuperOrSystemAdmin, validateSchema(createBenefitSchema), updateBenefit)
router.delete("/benefit", AuthJWT, isSuperOrSystemAdmin, deleteBenefit)

// about
router.post("/about", AuthJWT, isSuperOrSystemAdmin, upload.array('image', 1), createAbout)
router.patch("/about", AuthJWT, isSuperOrSystemAdmin, upload.array('image', 1), validateSchema(updateAboutSchema), updateAbout)
router.delete("/about/:aboutId", AuthJWT, isSuperOrSystemAdmin, validateSchema(deleteAboutSchema), deleteAbout)

// features
router.post("/feature", AuthJWT, isSuperOrSystemAdmin, validateSchema(createFeatureSchema), createFeature)
router.patch("/feature", AuthJWT, isSuperOrSystemAdmin, validateSchema(updateFeatureSchema), updateFeature)
router.delete("/features/:featureId", AuthJWT, isSuperOrSystemAdmin, validateSchema(deleteFeatureSchema), deleteFeature)



export default router;
