import { Response } from "express";
import asyncHandler from 'express-async-handler';
import { IUserMessage } from "../../middleware/authJWT";
import NotFoundError from "../../errors/notFound.errors";
import { z } from "zod";
import { loop } from "../../utils/help";
import Category from "../../model/category.model";
import { updateSubCategoryInput, updateSubSchema } from "../../utils/validation/category.validation";



//@desc update sub 
//@method PATCH  /category/:id/sub/:id
//@access private
export const updateSubcategory = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof updateSubSchema>["params"], {}, updateSubCategoryInput>, res: Response) => {
    const categoryId = req.params.category_id
    const subCategoryId = req.params.subCategory_id
    const category = await Category.findById(categoryId)
    if (!category) throw new NotFoundError('Category not found')
    const sub = category.subcategories.find(r => r._id.equals(subCategoryId))
    if (!sub) throw new NotFoundError('Subcategory doesnt exist')
    const body = { ...req.body } as any
    if (req?.files && req?.files.length) {
        const url = await loop(req?.files)
        body.photo = {
            public_id: url.id,
            url: url.url
        }
    }
    sub.name = body.name ? body.name : sub.name
    sub.photo = body.photo ? body.photo : sub.photo
    await category.save()
    res.json({
        success: true,
        data: category
    });


})
