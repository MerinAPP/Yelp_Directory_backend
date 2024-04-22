import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import { IUserMessage } from "../../../middleware/authJWT";
import layoutModel from "../../../model/layout.model";
import { createFeatureInput } from "../../../utils/validation/layout.validation";


export const createFeature = asyncHandler(async (req: IUserMessage<{}, {}, createFeatureInput>, res: Response) => {
    let layout = await layoutModel.findOne();
    if (!layout) {
        layout = await layoutModel.create({});
    }
    const body = req.body as any
    layout.feature.push(body);
    await layout.save();
    res.status(201).json({
        message: 'Feature created sucessfully',
        data: layout,
        sucess: true
    })


}) 