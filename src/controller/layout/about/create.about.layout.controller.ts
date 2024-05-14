import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import { IUserMessage } from "../../../middleware/authJWT";
import { loop } from "../../../utils/help";
import layoutModel from "../../../model/layout.model";
import { uploadFileToSpaces } from "../../../config/spaces";


export const createAbout = asyncHandler(async (req: IUserMessage, res: Response) => {
    const body = { ...req.body } as any
    if (req?.file) {
        const url = await uploadFileToSpaces(req.file);
        body.photo = {
            public_id: url.Key,
            url: url.Location
        };
    }
    let layout = await layoutModel.findOne();
    if (!layout) {
        layout = await layoutModel.create({});
    }
    layout.about.push({ ...body });
    await layout.save();
    res.status(201).json({
        message: 'About section created sucessfully',
        data: layout,
        sucess: true
    })


}) 