import { Request, Response } from 'express';
import businessModel from '../../model/bussiness.model'
import asyncHandler from 'express-async-handler';
import { getBusinessInput, getBusinessSchema } from '../../utils/validation/business.validation';
import { IUserMessage } from '../../middleware/authJWT';

import Category from '../../model/category.model';
import { ICategory, ISubcategory } from '../../interfaces/catgory.interface';


//@desc get all category
//@method GET  /category/sub
//@access public
export const getSubCategories = asyncHandler(async (req: Request, res: Response) => {
    const allCategories = await Category.find().lean().exec()
    let sub = []
    allCategories.forEach((c: ICategory) => {
        const newSub = [...sub, ...c.subcategories]
        sub = newSub
    })
    res.json({
        success: true,
        data: {
            sub

        }
    })
})
