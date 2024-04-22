import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import { IUserMessage } from "../../../middleware/authJWT";
import CategoryModel from '../../../model/product-category.model'
import { createCategoryInput } from "../../../utils/validation/category.validation";
import { loop } from "../../../utils/help";
import layoutModel from "../../../model/layout.model";

//@desc create new hero
//@method POST  /layout/hero
//@access private
export const createHero = asyncHandler(async (req: IUserMessage<{}, {}, {}>, res: Response) => {
    const body = { ...req.body } as any
    if (req?.files && req?.files.length) {
        const url = await loop(req?.files)
        body.photo = {
            public_id: url.id,
            url: url.url
        }
    }
    let layout = await layoutModel.findOne();
    if (layout) {
        console.log({ body })
        layout.hero = { ...body };
        console.log({ layout })
        await layout.save();
    } else {
        layout = await layoutModel.create({
            hero: { ...body },
        });
    }
    res.status(201).json({
        message: 'Hero section created sucessfully',
        data: layout,
        sucess: true
    })


}) 