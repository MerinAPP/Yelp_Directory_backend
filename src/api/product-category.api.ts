import express from "express";
import { AuthJWT, CustomerAuthJWT } from "../middleware/authJWT";
import {
    UpdateCategorySchema, createCategorySchema,
    deleteCategorySchema,
    getCategorySchema,
} from "../utils/validation/category.validation";
import validateSchema from "../middleware/validateSchema.middleware";
import { isSuperOrSystemAdmin, isSystemAdmin } from "../middleware/role.middleware";
import { getAllCategories } from "../controller/product-category/get.catagory.controller";
import { createCategory } from "../controller/product-category/create.product-category..controller";
import { deleteCategory } from "../controller/product-category/delete.category.controoler";
import { updateCategory } from "../controller/product-category/edit.category.controller";



const router = express.Router();


router.get("/", validateSchema(getCategorySchema), getAllCategories)
router.post("/", AuthJWT, isSuperOrSystemAdmin, validateSchema(createCategorySchema), createCategory)
router.delete("/:category_id", AuthJWT, isSuperOrSystemAdmin, validateSchema(deleteCategorySchema), deleteCategory)
router.patch("/:category_id", AuthJWT, isSuperOrSystemAdmin, validateSchema(UpdateCategorySchema), updateCategory)


export default router;
