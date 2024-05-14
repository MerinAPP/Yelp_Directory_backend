import { Response } from "express";
import asyncHandler from 'express-async-handler';
import { IUserMessage } from "../../../middleware/authJWT";
import layoutModel from "../../../model/layout.model";
import NotFoundError from "../../../errors/notFound.errors";
import { loop } from "../../../utils/help";
import { z } from "zod";
import { updateAboutInput, updateAboutSchema } from "../../../utils/validation/layout.validation";
import { uploadFileToSpaces } from "../../../config/spaces";




export const updateAbout = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof updateAboutSchema>["params"], {}, updateAboutInput>, res: Response) => {
    const aboutId = req.params.aboutId;
    let layout = await layoutModel.findOne();
    if (!layout) throw new NotFoundError('Layout not found')
    const body = { ...req.body } as any
    console.log(req?.files)
    if (req?.file) {
        const url = await uploadFileToSpaces(req.file);
        body.photo = {
            public_id: url.Key,
            url: url.Location
        };
    }
    const aboutSection = layout.about.find(a => a?._id === aboutId);
    if (!aboutSection) {
        throw new NotFoundError("About section not found")
    }
    aboutSection.photo = body.photo.url ? body.photo : aboutSection.photo;
    aboutSection.content = body.content ? body.content : aboutSection.content
    aboutSection.title = body.title ? body.title : aboutSection.title;
    await layout.save();
    res.status(200).json({
        success: true,
        data: layout
    });


})
