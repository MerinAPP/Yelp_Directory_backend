import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import { IUserMessage } from "../../middleware/authJWT";
import CategoryModel from '../../model/product-category.model'
import { createCategoryInput } from "../../utils/validation/category.validation";

//@desc create new category
//@method POST  /category
//@access private
export const createCategory = asyncHandler(async (req: IUserMessage<{}, {}, createCategoryInput>, res: Response) => {
    const category = await CategoryModel.create(req.body)
    if (category) {
        res.status(201).json({
            message: 'Product Category created sucessfully',
            data: category,
            sucess: true
        })
    }
    else {
        res.status(400).json({
            message: 'Product category creating failed',
            sucess: false
        })
    }







}) 