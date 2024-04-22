import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import { IUserMessage } from "../../../middleware/authJWT";
import CategoryModel from '../../../model/product-category.model'
import { createCategoryInput } from "../../../utils/validation/category.validation";
import { loop } from "../../../utils/help";
import layoutModel from "../../../model/layout.model";
import { createBenefitInput } from "../../../utils/validation/layout.validation";


export const createBenefit = asyncHandler(async (req: IUserMessage<{}, {}, createBenefitInput>, res: Response) => {
    let layout = await layoutModel.findOne();
    if (!layout) {
        layout = await layoutModel.create({});
    }
    const body = { question: req.body.question, answer: req.body.answer }
    layout.benefit = body
    await layout.save();
    res.status(201).json({
        message: 'About section created sucessfully',
        data: layout,
        sucess: true
    })


}) 