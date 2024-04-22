import express from "express";
import { AuthJWT, CustomerAuthJWT } from "../middleware/authJWT";
import { getUserCustomizedCategory } from "../controller/category/getCustomized.category.controller";
import { UpdateCategorySchema, createCategorySchema, createSubCategoryItemSchema, createSubCategorySchema, deleteCategorySchema, deleteSubCategoryItemSchema, deleteSubCategorySchema, getCategorySchema, updateSubSchema } from "../utils/validation/category.validation";
import { getAllCategories } from "../controller/category/get.catagory.controller";
import validateSchema from "../middleware/validateSchema.middleware";
import { isSuperOrSystemAdmin, isSystemAdmin } from "../middleware/role.middleware";
import { createCategory } from "../controller/category/create.category.controller";
import { deleteCategory } from "../controller/category/delete.category.controoler";
import { updateCategory } from "../controller/category/edit.category.controller";
import { upload } from "../config/mutler";
import { createSubCategory } from "../controller/category/createSub.category.controller";
import { updateSubcategory } from "../controller/category/editSub.category.controller";
import { deleteSubCategory } from "../controller/category/deleteSubCategory.controller";
import { getSubCategories } from "../controller/category/getSub.category.controller";
import { createSubCategoryItem } from "../controller/category/createSubItem.category.controller";
import { deleteSubCategoryItem } from "../controller/category/deleteSubItem.categoy.controller";


const router = express.Router();

// category
router.get("/categories-for-user", CustomerAuthJWT, getUserCustomizedCategory)
router.get("/", validateSchema(getCategorySchema), getAllCategories)
router.get("/sub", getSubCategories)

router.post("/", AuthJWT, isSuperOrSystemAdmin, validateSchema(createCategorySchema), createCategory)

router.delete("/:category_id", AuthJWT, isSuperOrSystemAdmin, validateSchema(deleteCategorySchema), deleteCategory)
router.patch("/:category_id", AuthJWT, isSuperOrSystemAdmin, validateSchema(UpdateCategorySchema), updateCategory)


// sub
router.post("/:category_id/sub", AuthJWT, isSuperOrSystemAdmin, upload.array('image', 1), validateSchema(createSubCategorySchema), createSubCategory)
router.patch("/:category_id/sub/:subCategory_id", AuthJWT, isSuperOrSystemAdmin, upload.array('image', 1), validateSchema(updateSubSchema), updateSubcategory)
router.delete("/:category_id/sub/:subCategory_id", AuthJWT, isSuperOrSystemAdmin, validateSchema(deleteSubCategorySchema), deleteSubCategory)


//sub item
router.post("/:category_id/sub/:subCategory_id/item", AuthJWT, isSuperOrSystemAdmin, upload.array('image', 1), validateSchema(createSubCategoryItemSchema), createSubCategoryItem)
router.delete("/:category_id/sub/:subCategory_id/item/:item_id", AuthJWT, isSuperOrSystemAdmin, validateSchema(deleteSubCategoryItemSchema), deleteSubCategoryItem)








export default router;
