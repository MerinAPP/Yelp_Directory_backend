import { Response } from "express";
import asyncHandler from 'express-async-handler';
import { IUserMessage } from "../../middleware/authJWT";
import NotFoundError from "../../errors/notFound.errors";
import { z } from "zod";
import { deleteCategorySchema, deleteSubCategoryItemSchema, deleteSubCategorySchema } from "../../utils/validation/category.validation";
import Category from "../../model/category.model";


//@desc delete sub category
//@method DELETE  /category/:id/sub/:id/item/:id
//@access private
export const deleteSubCategoryItem = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof deleteSubCategoryItemSchema>["params"], {}, {}>, res: Response) => {
    const categoryId = req.params.category_id
    const subCategoryId = req.params.subCategory_id
    const itemId = req.params.item_id
    /* check*/
    const category = await Category.findById(categoryId).exec();
    if (!category) throw new NotFoundError('Category not found')
    const sub = category.subcategories.find(r => r._id.equals(subCategoryId))
    if (!sub) throw new NotFoundError('Subcategory doesnt exist')
    const item = sub?.items?.find(r => r._id.equals(itemId))
    if (!item) throw new NotFoundError('Subcategory Item doesnt exist')
    /* check*/


    const preSubCatgory = category.subcategories.filter(r => !r._id.equals(subCategoryId))
    const newSubCategoryItems = sub.items?.filter(item => !item?._id.equals(itemId))
    sub.items = newSubCategoryItems
    const newCategories = [...preSubCatgory, sub]
    category.subcategories = newCategories
    await category.save()
    res.json({
        success: true,
        data: category
    });


})
