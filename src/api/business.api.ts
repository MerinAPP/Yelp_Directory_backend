import express from "express";
import { AuthJWT, CustomerAuthJWT } from "../middleware/authJWT";
import validateSchema from "../middleware/validateSchema.middleware";
import { isBussinessOwner, isBussinessOwnerOrAdmin, isSuperOrSystemAdmin, isSystemAdmin } from "../middleware/role.middleware";
import {
  CreateBusinessSchema, updateProductSchema,
  UpdateBusinessSchema, createBranchSchema,
  createProductSchema, deleteBranchSchema,
  deleteProductSchema, getBusinessSchema,
  getSingleBusinessSchema, giveReviewSchema,
  replySchema, updateBranchSchema,
  createContactMessaggeSchema,
  changeBusinessSponserSchema,
  changeBusinessStatusSchema,
  reactToReviewSchema,
} from "../utils/validation/business.validation";


import {
  createBusiness,
  updateBusiness,
  changeBusinessStatus,
  getAllBusiness,
  getSingleBusiness,
  createReview,
  createContactMessage,
  reviewReply,
  deleteBusiness,
  createBranch,
  updatebranch,
  deleteBranch,
  updateProduct,
  createProduct,
  deleteProduct,
} from '../controller/business/index.business.controller'
import { upload } from "../config/mutler";
import { changeBusinessSponser } from "../controller/business/makeSponser.business.controller";
import { getUserCustomizedBusiness } from "../controller/business/getCustomized.business.controller";
import { reactToReview } from "../controller/business/reactToReview.business.controller";
import { getProducts } from "../controller/business/get.products.business.controller";

const router = express.Router();
const uploadFields = [
  { name: 'logo', maxCount: 1 },
  { name: 'coverPhoto', maxCount: 1 },
  { name: 'gallery', maxCount: 10 },
  { name: "license", maxCount: 10 }
];
const uploadMiddleware = upload.fields(uploadFields);

// business
router.get("/bussiness-for-user", CustomerAuthJWT, validateSchema(getBusinessSchema), getUserCustomizedBusiness)
router.get("/", validateSchema(getBusinessSchema), getAllBusiness)

router.get("/:business_id", validateSchema(getSingleBusinessSchema), getSingleBusiness)
router.post("/", AuthJWT, isBussinessOwner, uploadMiddleware, validateSchema(CreateBusinessSchema), createBusiness)
router.delete("/:business_id", AuthJWT, isSystemAdmin, validateSchema(replySchema), deleteBusiness)
router.patch("/:business_id/changeStatus", AuthJWT, isSuperOrSystemAdmin, validateSchema(changeBusinessStatusSchema), changeBusinessStatus)
router.patch("/:business_id/changeSponser", AuthJWT, isSuperOrSystemAdmin, validateSchema(changeBusinessSponserSchema), changeBusinessSponser)
router.patch("/:business_id", AuthJWT, isBussinessOwnerOrAdmin, uploadMiddleware, validateSchema(UpdateBusinessSchema), updateBusiness)


// review
router.patch("/:business_id/review", CustomerAuthJWT, upload.array('image', 1), validateSchema(giveReviewSchema), createReview)
router.patch("/:business_id/review/:review_id/react", CustomerAuthJWT, validateSchema(reactToReviewSchema), reactToReview)
router.patch("/:business_id/review/:review_id/replay", AuthJWT, isBussinessOwnerOrAdmin, validateSchema(replySchema), reviewReply)


// message
router.patch("/:business_id/contactUs", CustomerAuthJWT, validateSchema(createContactMessaggeSchema), createContactMessage)


// product
router.get("/:business_id/product",validateSchema(getProducts), getProducts)
router.post("/:business_id/product", AuthJWT, isBussinessOwnerOrAdmin, upload.array('image', 1), validateSchema(createProductSchema), createProduct)
router.patch("/:business_id/product/:product_id", AuthJWT, isBussinessOwnerOrAdmin, upload.array('image', 1), validateSchema(updateProductSchema), updateProduct)
router.delete("/:business_id/product/:product_id", AuthJWT, isBussinessOwnerOrAdmin, validateSchema(deleteProductSchema), deleteProduct)


// branch
router.post("/:business_id/branch", AuthJWT, isBussinessOwnerOrAdmin, upload.array('image', 1), validateSchema(createBranchSchema), createBranch)
router.patch("/:business_id/branch/:branch_id", AuthJWT, isBussinessOwnerOrAdmin, upload.array('image', 1), validateSchema(updateBranchSchema), updatebranch)
router.delete("/:business_id/branch/:branch_id", AuthJWT, isBussinessOwnerOrAdmin, validateSchema(deleteBranchSchema), deleteBranch)







export default router;
