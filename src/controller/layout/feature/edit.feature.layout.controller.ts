import { Response } from "express";
import asyncHandler from 'express-async-handler';
import { IUserMessage } from "../../../middleware/authJWT";
import layoutModel from "../../../model/layout.model";
import NotFoundError from "../../../errors/notFound.errors";
import { z } from "zod";
import { updateFeatureSchema, updateFeatureType } from "../../../utils/validation/layout.validation";




export const updateFeature = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof updateFeatureSchema>["params"], {}, updateFeatureType>, res: Response) => {
    const featureId = req.params.featureId;
    let layout = await layoutModel.findOne();
    if (!layout) throw new NotFoundError('Layout not found')
    const feature = layout.feature.find(a => a?._id === featureId);
    if (!feature) {
        throw new NotFoundError('Feature not found')
    }
    const body = req.body
    feature.subTitle = body.subTitle ? body.subTitle : feature.subTitle
    feature.title = body.title ? body.title : feature.title;
    await layout.save();
    res.status(200).json({
        success: true,
        data: layout
    });


})
