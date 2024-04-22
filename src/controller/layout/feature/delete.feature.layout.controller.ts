import { Response } from "express";
import asyncHandler from 'express-async-handler';
import { IUserMessage } from "../../../middleware/authJWT";
import layoutModel from "../../../model/layout.model";
import NotFoundError from "../../../errors/notFound.errors";
import { z } from "zod";
import { deleteAboutSchema, deleteFeatureSchema } from "../../../utils/validation/layout.validation";




export const deleteFeature = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof deleteFeatureSchema>["params"], {}, {}>, res: Response) => {
    const featureId = req.params.featureId;
    let layout = await layoutModel.findOne();
    if (!layout) throw new NotFoundError('Layout not found')
    const aboutSections = layout.feature.filter(a => a?._id != featureId);
    layout.feature = aboutSections
    await layout.save();
    res.status(200).json({
        success: true,
    });


})
