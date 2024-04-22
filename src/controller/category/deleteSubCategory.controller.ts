import { Response } from "express";
import asyncHandler from 'express-async-handler';
import { IUserMessage } from "../../middleware/authJWT";
import NotFoundError from "../../errors/notFound.errors";
import { z } from "zod";
import { deleteCategorySchema, deleteSubCategorySchema } from "../../utils/validation/category.validation";
import Category from "../../model/category.model";


//@desc delete sub category
//@method DELETE  /category/:id/sub/:id
//@access private
export const deleteSubCategory = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof deleteSubCategorySchema>["params"], {}, {}>, res: Response) => {
    const categoryId = req.params.category_id
    const subCategoryId = req.params.subCategory_id
    const category = await Category.findById(categoryId).exec();
    if (!category) throw new NotFoundError('Category not found')
    const sub = category.subcategories.find(r => r._id.equals(subCategoryId))
    if (!sub) throw new NotFoundError('Subcategory doesnt exist')

    const filterdSub = category.subcategories.filter(r => !r?._id.equals(subCategoryId))
    category.subcategories = filterdSub
    await category.save()
    res.json({
        success: true,
        data: category
    });


})
