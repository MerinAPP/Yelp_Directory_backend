import { Request, Response } from "express";
;
import asyncHandler from 'express-async-handler';
import { updateBusinessInput, UpdateBusinessSchema } from "../../utils/validation/business.validation";
import { IUserMessage } from "../../middleware/authJWT";

import NotFoundError from "../../errors/notFound.errors";
import { z } from "zod";
import Category from "../../model/product-category.model";
import { UpdateCategorySchema, updateSubCategoryInput, } from "../../utils/validation/category.validation";


//@desc update category
//@method PATCH  /category/:category_id
//@access private
export const updateCategory = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof UpdateCategorySchema>["params"], {}, updateSubCategoryInput>, res: Response) => {
    const existingCategory = await Category.findById(req.params.category_id)
    if (!existingCategory) throw new NotFoundError("Category not found")

    const category = await Category.findByIdAndUpdate(existingCategory._id, req.body, { new: true })
    if (category) {
        res.status(200).json({
            message: 'Category updated sucessfully',
            data: category,
            sucess: true
        })
    }
    else {
        res.status(400).json({
            message: 'Category updating failed',
            sucess: false
        })
    }







}) 