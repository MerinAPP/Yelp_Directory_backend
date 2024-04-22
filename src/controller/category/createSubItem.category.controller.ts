import { Request, Response } from "express";
;
import asyncHandler from 'express-async-handler';
import { createBusinessInput, giveReviewInput, giveReviewSchema } from "../../utils/validation/business.validation";
import { IUserMessage } from "../../middleware/authJWT";
import bussinessModel from "../../model/bussiness.model";
import NotFoundError from "../../errors/notFound.errors";
import { z } from "zod";
import { loop } from "../../utils/help";
import Category from "../../model/category.model";
import { createSubCategoryInput, createSubCategoryItemSchema, createSubCategorySchema } from "../../utils/validation/category.validation";



//@desc create new sub-category-item
//@method POST  /category/:id/sub/:id/item
//@access private
export const createSubCategoryItem = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof createSubCategoryItemSchema>["params"], {}, createSubCategoryInput>, res: Response) => {
    const body = { ...req.body } as any
    if (req?.files && req?.files.length) {
        const url = await loop(req?.files)
        console.log({ url })
        body.photo = {
            public_id: url.id,
            url: url.url
        }
    }
    const categoryId = req.params.category_id
    const subCategoryId = req.params.subCategory_id

    const category = await Category.findById(categoryId)
    if (!category) throw new NotFoundError('category not found')
    const subCategory = category?.subcategories.find(sub => sub?._id.equals(subCategoryId))
    if (!subCategory) throw new NotFoundError('Subcategory not found')
    subCategory?.items.push(body)
    await category.save()
    res.json({ success: true, data: category });


})
