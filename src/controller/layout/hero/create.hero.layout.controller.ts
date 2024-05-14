import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import { IUserMessage } from "../../../middleware/authJWT";
import CategoryModel from '../../../model/product-category.model'
import { createCategoryInput } from "../../../utils/validation/category.validation";
import { loop } from "../../../utils/help";
import layoutModel from "../../../model/layout.model";
import { uploadFileToSpaces } from "../../../config/spaces";

//@desc create new hero
//@method POST  /layout/hero
//@access private
export const createHero = asyncHandler(async (req: IUserMessage<{}, {}, {}>, res: Response) => {
    const body = { ...req.body } as any
    if (req?.file) {
        const url = await uploadFileToSpaces(req.file);
        body.photo = {
            public_id: url.Key,
            url: url.Location
        };
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