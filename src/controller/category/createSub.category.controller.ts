import { Request, Response } from "express";
;
import asyncHandler from 'express-async-handler';
import { createBusinessInput, giveReviewInput, giveReviewSchema } from "../../utils/validation/business.validation";
import { IUserMessage } from "../../middleware/authJWT";
import bussinessModel from "../../model/bussiness.model";
import NotFoundError from "../../errors/notFound.errors";
import { z } from "zod";
import { Product } from "../../interfaces/business.interface";
import { loop } from "../../utils/help";
import Category from "../../model/category.model";
import { createSubCategoryInput, createSubCategorySchema } from "../../utils/validation/category.validation";



//@desc create new sub category
//@method POST  /category/:id/sub
//@access private
export const createSubCategory = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof createSubCategorySchema>["params"], {}, createSubCategoryInput>, res: Response) => {
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
    const category = await Category.findById(categoryId)
    if (!category) throw new NotFoundError('category not found')
    category.subcategories.push(body)
    await category.save()
    res.json({ success: true, data: category });


})
