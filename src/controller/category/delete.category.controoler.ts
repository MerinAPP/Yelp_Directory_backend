import asyncHandler from 'express-async-handler';
import { Response } from "express";
import { IUserMessage } from '../../middleware/authJWT';
import NotFoundError from '../../errors/notFound.errors';
import { z } from 'zod';
import Category from '../../model/category.model';
import { deleteCategorySchema } from '../../utils/validation/category.validation';
//@desc delete category
//@method PATCH  /category/:category_id
//@access private
export const deleteCategory = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof deleteCategorySchema>["params"], {}, {}>, res: Response) => {
    const existingCategory = await Category.findById(req.params.category_id)
    if (!existingCategory) throw new NotFoundError("Category not found")
    const deleteCategory = await Category.findByIdAndDelete(req.params.category_id)
    res.json({ success: true, message: "Category deleted sucessfully" });
})