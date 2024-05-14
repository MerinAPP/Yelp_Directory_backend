import express from "express";
import { AuthJWT, CustomerAuthJWT } from "../middleware/authJWT";
import validateSchema from "../middleware/validateSchema.middleware";
import { updateCustomerProfileSchema, updateProfileSchema } from "../utils/validation/auth.validation";
import { upload } from "../config/mutler";
import { updateCustomerProfile } from "../controller/profile/updateCustomer.profile.controller";
import { updateProfile } from "../controller/profile/update.profile.controller";
import { profile } from "../controller/profile/get.profile.controller";
import { addToOrRemoveFavCatSchema, createUserFavCatSchema, deleteFavSchema, editFavCatSchema } from "../utils/validation/user.validation";
import { createFavCat } from "../controller/profile/createFavCat.profile.controller";
import { addToFav } from "../controller/profile/addToFav.profile.controller";
import { removeFromFav } from "../controller/profile/removeFromfav.profile.controller";
import { getFavCategoryWithBusiness } from "../controller/profile/getFavCategoryWithBusiness.profile.controller";
import { deleteFav } from "../controller/profile/deleteFavCat.profile.controller";
import { editFavCat } from "../controller/profile/editFavCat.profile.controller";
import { deleteAccount } from "../controller/profile/deleteAccount.[rofile.controller";

const router = express.Router();

router.patch("/customer",
    CustomerAuthJWT,
    upload.single('image'),
    validateSchema(updateCustomerProfileSchema),
    updateCustomerProfile)

router.get("/customer", CustomerAuthJWT, profile)
router.delete("/delete-account", CustomerAuthJWT, deleteAccount)


/*favorite catgory*/
router.post("/favCat", CustomerAuthJWT, validateSchema(createUserFavCatSchema), createFavCat)
router.get("/favCat", CustomerAuthJWT, getFavCategoryWithBusiness)
router.delete("/favCat/:favCat_id", CustomerAuthJWT, validateSchema(deleteFavSchema), deleteFav)
router.patch("/favCat/:favCat_id", CustomerAuthJWT, validateSchema(editFavCatSchema), editFavCat)



router.patch("/favCat/:favCat_id/add", CustomerAuthJWT, validateSchema(addToOrRemoveFavCatSchema), addToFav)
router.patch("/favCat/:favCat_id/remove", CustomerAuthJWT, validateSchema(addToOrRemoveFavCatSchema), removeFromFav)




/*admin*/
router.patch('/', AuthJWT, upload.array('image', 1), validateSchema(updateProfileSchema), updateProfile)
router.get("/", AuthJWT, profile)


export default router;



























