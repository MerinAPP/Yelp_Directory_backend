import { Response } from "express";
import asyncHandler from 'express-async-handler';
import { IUserMessage } from "../../../middleware/authJWT";
import layoutModel from "../../../model/layout.model";
import NotFoundError from "../../../errors/notFound.errors";
import { z } from "zod";
import { deleteAboutSchema } from "../../../utils/validation/layout.validation";




export const deleteAbout = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof deleteAboutSchema>["params"], {}, {}>, res: Response) => {
    const aboutId = req.params.aboutId;
    let layout = await layoutModel.findOne();
    if (!layout) throw new NotFoundError('Layout not found')
    const aboutSections = layout.about.filter(a => a?._id != aboutId);
    layout.about = aboutSections
    await layout.save();
    res.status(200).json({
        success: true,
    });


})
